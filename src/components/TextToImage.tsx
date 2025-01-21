import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlignLeft, AlignCenter, AlignRight, Download } from "lucide-react";
import JSZip from "jszip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const THEMES = [
  { bg: "bg-theme-1", text: "text-gray-900" },
  { bg: "bg-theme-2", text: "text-gray-900" },
  { bg: "bg-theme-3", text: "text-gray-900" },
  { bg: "bg-theme-4", text: "text-gray-900" },
];

const MAX_TOTAL_CHARS = 5000;
const MAX_CHARS_PER_SLIDE = 500;

const TextToImage = () => {
  const [text, setText] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");
  const previewRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_TOTAL_CHARS) {
      setText(newText);
    }
  };

  // Split text into chunks of MAX_CHARS_PER_SLIDE characters
  const textChunks = text
    .match(new RegExp(`.{1,${MAX_CHARS_PER_SLIDE}}`, "g"))
    ?.map((chunk) => chunk.trim()) || [];

  const generateImage = async (chunk: string) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Instagram square size
      canvas.width = 1080;
      canvas.height = 1080;

      // Set background
      ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue(`--theme-${selectedTheme + 1}`)
        .trim();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Configure text
      ctx.fillStyle = "#000000";
      ctx.font = "bold 48px Inter";
      ctx.textAlign = alignment;

      // Calculate text position
      const x =
        alignment === "left"
          ? 100
          : alignment === "right"
          ? canvas.width - 100
          : canvas.width / 2;
      let y = 100;

      // Split text into lines and draw
      const words = chunk.split(" ");
      let line = "";
      const maxWidth = canvas.width - 200;

      for (let word of words) {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth) {
          ctx.fillText(line, x, y);
          line = word + " ";
          y += 60;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);

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
      // Generate all images in parallel
      const blobs = await Promise.all(textChunks.map(generateImage));

      if (blobs.length > 1) {
        // Create a zip file for multiple images
        const zip = new JSZip();
        blobs.forEach((blob, index) => {
          zip.file(`instagram-post-${index + 1}.png`, blob);
        });

        // Generate and download the zip file
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "instagram-posts.zip";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // Download single image directly
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
          <Textarea
            placeholder="Enter your text here..."
            className="min-h-[200px] resize-none"
            value={text}
            onChange={handleTextChange}
            maxLength={MAX_TOTAL_CHARS}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={alignment === "left" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlignment("left")}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={alignment === "center" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlignment("center")}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant={alignment === "right" ? "default" : "outline"}
                size="icon"
                onClick={() => setAlignment("right")}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              {text.length}/{MAX_TOTAL_CHARS} characters
            </span>
          </div>

          <div className="flex gap-2">
            {THEMES.map((theme, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full ${theme.bg} border-2 transition-all ${
                  selectedTheme === index
                    ? "border-blue-500 scale-110"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedTheme(index)}
              />
            ))}
          </div>

          <Button
            className="w-full"
            onClick={handleDownload}
            disabled={!text.trim()}
          >
            <Download className="mr-2 h-4 w-4" /> Download Images
          </Button>
        </div>

        <div className="aspect-square">
          {textChunks.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {textChunks.map((chunk, index) => (
                  <CarouselItem key={index}>
                    <div
                      className={`aspect-square rounded-lg ${
                        THEMES[selectedTheme].bg
                      } ${
                        THEMES[selectedTheme].text
                      } p-8 flex items-center justify-center text-lg`}
                      style={{ textAlign: alignment }}
                    >
                      {chunk}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div
              ref={previewRef}
              className={`aspect-square rounded-lg ${THEMES[selectedTheme].bg} ${
                THEMES[selectedTheme].text
              } p-8 flex items-center justify-center text-lg`}
              style={{ textAlign: alignment }}
            >
              Preview will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextToImage;