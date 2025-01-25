import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";
import JSZip from "jszip";
import { TextControls } from "./text-to-image/TextControls";
import { ColorSettings } from "./text-to-image/ColorSettings";
import { PreviewCarousel } from "./text-to-image/PreviewCarousel";
import { splitTextIntoChunks, MAX_TOTAL_CHARS, MAX_CHARS_PER_SLIDE } from "@/utils/textProcessing";

const THEMES = [
  { bg: "bg-theme-1", text: "text-gray-900" },
  { bg: "bg-theme-2", text: "text-gray-900" },
  { bg: "bg-theme-3", text: "text-gray-900" },
  { bg: "bg-theme-4", text: "text-gray-900" },
  { bg: "bg-theme-5", text: "text-gray-900" },
  { bg: "bg-theme-6", text: "text-gray-900" },
];

const FONTS = [
  { name: "Georgia", class: "font-georgia" },
  { name: "Courier New", class: "font-courier" },
  { name: "Palatino", class: "font-palatino" },
  { name: "Helvetica", class: "font-helvetica" },
  { name: "Bookman Old Style", class: "font-bookman" },
];

const TextToImage = () => {
  const [text, setText] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [selectedFont, setSelectedFont] = useState(FONTS[0].name);
  const [selectedTextColor, setSelectedTextColor] = useState("#000000");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_TOTAL_CHARS) {
      setText(newText);
    }
  };

  const textChunks = text.length > 0 ? splitTextIntoChunks(text) : [];

  const generateImage = async (chunk: string) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 1080;
      canvas.height = 1080;

      // Fill background
      ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue(`--theme-${selectedTheme + 1}`)
        .trim();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Text settings
      ctx.fillStyle = selectedTextColor;
      const fontFamily = FONTS.find(f => f.name === selectedFont)?.name || 'serif';
      ctx.font = `bold 38px ${fontFamily}`; // Reduced font size for better fit
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
      const verticalPadding = 100; // Minimum padding from top and bottom
      const maxAvailableHeight = canvas.height - (2 * verticalPadding);

      // If text doesn't fit, return null to trigger a new image
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

  const handleDownload = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text first!");
      return;
    }

    try {
      const blobs = await Promise.all(textChunks.map(generateImage));

      if (blobs.length > 1) {
        const zip = new JSZip();
        blobs.forEach((blob, index) => {
          zip.file(`instagram-post-${index + 1}.png`, blob);
        });

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "instagram-posts.zip";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const url = URL.createObjectURL(blobs[0]);
        const a = document.createElement("a");
        a.href = url;
        a.download = "instagram-post.png";
        a.click();
        URL.revokeObjectURL(url);
      }

      toast.success(
        blobs.length > 1
          ? `${blobs.length} images zipped and downloaded successfully!`
          : "Image downloaded successfully!"
      );
    } catch (error) {
      console.error("Error generating images:", error);
      toast.error("Failed to generate images. Please try again.");
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Instagram Text Post Generator
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <TextControls
            text={text}
            onTextChange={handleTextChange}
            alignment={alignment}
            setAlignment={setAlignment}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
            maxTotalChars={MAX_TOTAL_CHARS}
          />

          <ColorSettings
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            selectedTextColor={selectedTextColor}
            setSelectedTextColor={setSelectedTextColor}
          />

          <Button
            className="w-full"
            onClick={handleDownload}
            disabled={!text.trim()}
          >
            <Download className="mr-2 h-4 w-4" /> Download Images
          </Button>
        </div>

        <div className="aspect-square">
          <PreviewCarousel
            textChunks={textChunks}
            selectedTheme={selectedTheme}
            selectedFont={selectedFont}
            selectedTextColor={selectedTextColor}
            alignment={alignment}
            THEMES={THEMES}
            FONTS={FONTS}
          />
        </div>
      </div>
    </div>
  );
};

export default TextToImage;