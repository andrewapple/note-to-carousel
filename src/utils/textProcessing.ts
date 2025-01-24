export const MAX_CHARS_PER_SLIDE = 600;
export const MAX_TOTAL_CHARS = 10000;

export const splitTextIntoChunks = (text: string): string[] => {
  const chunks: string[] = [];
  const paragraphs = text.split(/\n{3,}/);
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if ((currentChunk + paragraph).length > MAX_CHARS_PER_SLIDE) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = paragraph;
    } else if (currentChunk) {
      currentChunk += '\n\n' + paragraph;
    } else {
      currentChunk = paragraph;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
};

export const getImageBreakPositions = (text: string): number[] => {
  const positions: number[] = [];
  let pos = 0;
  let imageNumber = 2; // Start from 2 since first image doesn't need indicator

  const paragraphs = text.split(/\n/);
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    
    if (i < paragraphs.length - 2 && 
        paragraphs[i + 1] === '' && 
        paragraphs[i + 2] === '') {
      pos += paragraph.length + 1; // +1 for the newline
      positions.push({ position: pos, imageNumber });
      imageNumber++;
      i += 2; // Skip the next two empty lines
    } else {
      pos += paragraph.length + 1; // +1 for the newline
    }
  }

  return positions;
};