export const MAX_TOTAL_CHARS = 12000;
export const MAX_IMAGES = 20;
export const MAX_CHARS_PER_SLIDE = 600;

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
}