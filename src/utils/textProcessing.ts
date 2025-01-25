export const MAX_CHARS_PER_SLIDE = 600;
export const MAX_TOTAL_CHARS = 12000;

/*
export const splitTextIntoChunks = (text: string): string[] => {
  if (!text.trim()) return [];
  
  const chunks: string[] = [];
  let currentChunk = '';
  
  // Split by triple newlines first to handle manual image breaks
  const segments = text.split(/\n{3,}/);
  
  segments.forEach((segment) => {
    if (!segment.trim()) return;
    
    // If this chunk would exceed the limit, start a new one
    if (currentChunk && (currentChunk + segment).length > MAX_CHARS_PER_SLIDE) {
      chunks.push(currentChunk.trim());
      currentChunk = segment;
    } else if (!currentChunk) {
      currentChunk = segment;
    } else {
      currentChunk += segment;
    }
    
    // If current chunk exceeds limit, split it
    while (currentChunk.length > MAX_CHARS_PER_SLIDE) {
      // Find the last space before the limit
      const lastSpace = currentChunk.lastIndexOf(' ', MAX_CHARS_PER_SLIDE);
      if (lastSpace === -1) {
        // If no space found, force split at limit
        chunks.push(currentChunk.slice(0, MAX_CHARS_PER_SLIDE).trim());
        currentChunk = currentChunk.slice(MAX_CHARS_PER_SLIDE);
      } else {
        chunks.push(currentChunk.slice(0, lastSpace).trim());
        currentChunk = currentChunk.slice(lastSpace + 1);
      }
    }
  });
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
};*/

export const splitTextIntoChunks = (text: string): string[] => {
  if (!text.trim()) return [];
  
  const chunks: string[] = [];
  let currentChunk = '';
  
  // Split by triple newlines first to handle manual image breaks
  const segments = text.split(/\n{3,}/);
  
  segments.forEach((segment, index) => {
    if (!segment.trim()) return;

    // Reintroduce triple newlines for concatenation
    const processedSegment = index > 0 ? `\n\n\n${segment}` : segment;

    // If this chunk would exceed the limit, start a new one
    if (currentChunk && (currentChunk + processedSegment).length > MAX_CHARS_PER_SLIDE) {
      chunks.push(currentChunk.trim());
      currentChunk = segment; // Start a new chunk without leading newlines
    } else if (!currentChunk) {
      currentChunk = segment;
    } else {
      currentChunk += processedSegment;
    }

    // If current chunk exceeds limit, split it
    while (currentChunk.length > MAX_CHARS_PER_SLIDE) {
      // Find the last space before the limit
      const lastSpace = currentChunk.lastIndexOf(' ', MAX_CHARS_PER_SLIDE);
      if (lastSpace === -1) {
        // If no space found, force split at limit
        chunks.push(currentChunk.slice(0, MAX_CHARS_PER_SLIDE).trim());
        currentChunk = currentChunk.slice(MAX_CHARS_PER_SLIDE);
      } else {
        chunks.push(currentChunk.slice(0, lastSpace).trim());
        currentChunk = currentChunk.slice(lastSpace + 1);
      }
    }
  });
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
};



export const getImageBreakPositions = (text: string): { position: number; imageNumber: number }[] => {
  const positions: { position: number; imageNumber: number }[] = [];
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

