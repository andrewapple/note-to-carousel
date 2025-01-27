export const MAX_TOTAL_CHARS = 12000;
export const MAX_IMAGES = 20;
export const MAX_CHARS_PER_SLIDE = 600;

export function splitTextIntoChunks(text: string): string[] {
  const chunks: string[] = [];
  const paragraphs = text.split(/\n\n\n/); // Split by triple newline
  let currentChunk = "";

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    const paragraphParts = paragraph.split(/\n\n/); // Split by double newline for finer granularity

    for (let part of paragraphParts) {
      if ((currentChunk + "\n\n" + part).length > MAX_CHARS_PER_SLIDE) {
        // If adding this part exceeds the limit, push the current chunk and start a new one
        chunks.push(currentChunk);
        currentChunk = part;
      } else {
        // Otherwise, append the part to the current chunk
        currentChunk = currentChunk ? currentChunk + "\n\n" + part : part;
      }

      // Check if the current chunk now exceeds the max length
      while (currentChunk.length > MAX_CHARS_PER_SLIDE) {
        chunks.push(currentChunk.slice(0, MAX_CHARS_PER_SLIDE));
        currentChunk = currentChunk.slice(MAX_CHARS_PER_SLIDE).trim(); // Carry over the remainder
      }
    }

    // If we're at the end of a paragraph and still have content
    if (i < paragraphs.length - 1 || currentChunk.length >= MAX_CHARS_PER_SLIDE) {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = "";
      }
    }
  }

  // Push any remaining content as a final chunk
  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks.slice(0, MAX_IMAGES); // Limit the total number of images if necessary
}


/*
export function splitTextIntoChunks(text: string): string[] {
  const chunks: string[] = [];
  const paragraphs = text.split(/\n\n\n/);
  let currentChunk = "";
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i].trim();
    const paragraphParts = paragraph.split(/\n\n/);
    
    for (let part of paragraphParts) {
      if (currentChunk && (currentChunk + "\n\n" + part).length > MAX_CHARS_PER_SLIDE) {
        chunks.push(currentChunk);
        currentChunk = part;
      } else {
        currentChunk = currentChunk ? currentChunk + "\n\n" + part : part;
      }
      
      if (currentChunk.length >= MAX_CHARS_PER_SLIDE) {
        chunks.push(currentChunk);
        currentChunk = "";
      }
    }
    
    if (i < paragraphs.length - 1 || currentChunk.length >= MAX_CHARS_PER_SLIDE) {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = "";
      }
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  return chunks.slice(0, MAX_IMAGES);
}*/

/*
export const MAX_CHARS_PER_SLIDE = 600;
export const MAX_TOTAL_CHARS = 12000;

export const splitTextIntoChunks = (text: string): string[] => {
  const chunks: string[] = [];
  const paragraphs = text.split(/\n{3,}/);
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    // If this is a new chunk due to triple newline
    if (currentChunk && paragraph) {
      chunks.push(currentChunk.trim());
      currentChunk = paragraph;
      continue;
    }

    // Split paragraph into words
    const words = paragraph.split(/(\s+)/);
    
    for (const word of words) {
      // Check if adding this word would exceed the limit
      if ((currentChunk + word).length > MAX_CHARS_PER_SLIDE) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = word;
        } else {
          // If a single word is longer than the limit, we still need to include it
          currentChunk = word;
        }
      } else {
        currentChunk += word;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
};*/

interface ImageBreakInfo {
  position: number;
  imageNumber: number;
}

export const getImageBreakPositions = (text: string): ImageBreakInfo[] => {
  const positions: ImageBreakInfo[] = [];
  let pos = 0;
  let imageNumber = 2;

  const paragraphs = text.split(/\n/);
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    
    if (i < paragraphs.length - 2 && 
        paragraphs[i + 1] === '' && 
        paragraphs[i + 2] === '') {
      pos += paragraph.length + 1;
      positions.push({ position: pos, imageNumber });
      imageNumber++;
      i += 2;
    } else {
      pos += paragraph.length + 1;
    }
  }

  return positions;
};
