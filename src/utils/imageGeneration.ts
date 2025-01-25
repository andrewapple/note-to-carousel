export const generateImage = async (
  chunk: string,
  selectedTheme: number,
  selectedFont: string,
  selectedTextColor: string,
  alignment: "left" | "center" | "right"
) => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = 1080;
    canvas.height = 1080;

    // Fill background
    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue(`--theme-${selectedTheme + 1}`)
      .trim();
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text settings
    ctx.fillStyle = selectedTextColor;
    ctx.font = `bold 38px ${selectedFont}`;
    ctx.textAlign = alignment;

    const x =
      alignment === "left"
        ? 100
        : alignment === "right"
        ? canvas.width - 100
        : canvas.width / 2;

    const maxWidth = canvas.width - 200;
    const lines: string[] = [];
    const paragraphs = chunk.split(/\n\n/);
    
    // Calculate lines with proper word wrapping
    paragraphs.forEach((paragraph, pIndex) => {
      const words = paragraph.split(" ");
      let currentLine = "";
      
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? " " : "") + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth) {
          if (currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = word;
          }
        } else {
          currentLine = testLine;
        }
      });
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      // Add empty line between paragraphs, except after the last paragraph
      if (pIndex < paragraphs.length - 1) {
        lines.push("");
      }
    });

    // Calculate total text height and position vertically
    const lineHeight = 60;
    const totalTextHeight = lines.length * lineHeight;
    const verticalPadding = 100;
    const maxAvailableHeight = canvas.height - (2 * verticalPadding);

    // If text doesn't fit, split into new image
    if (totalTextHeight > maxAvailableHeight) {
      return null;
    }

    const startY = Math.max(
      verticalPadding,
      (canvas.height - totalTextHeight) / 2
    );

    // Draw text with proper vertical positioning
    let currentY = startY;
    lines.forEach(line => {
      if (line) {
        ctx.fillText(line, x, currentY);
      }
      currentY += lineHeight;
    });

    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/png");
    });
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};