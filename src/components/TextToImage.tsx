import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlignLeft, AlignCenter, AlignRight, Download } from "lucide-react";

const THEMES = [
  { bg: "bg-theme-1", text: "text-gray-900" },
  { bg: "bg-theme-2", text: "text-gray-900" },
  { bg: "bg-theme-3", text: "text-gray-900" },
  { bg: "bg-theme-4", text: "text-gray-900" },
];

const TextToImage = () => {
  const [text, setText] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");
  const previewRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const generateImage = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text first!");
      return;
    }

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
      const x = alignment === "left" ? 100 : 
               alignment === "right" ? canvas.width - 100 : 
               canvas.width / 2;
      let y = 100;

      // Split text into lines and draw
      const words = text.split(" ");
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

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "instagram-post.png";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Image downloaded successfully!");
      }, "image/png");

    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
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
            maxLength={500}
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
              {text.length}/500 characters
            </span>
          </div>
          
          <div className="flex gap-2">
            {THEMES.map((theme, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full ${theme.bg} border-2 transition-all ${
                  selectedTheme === index ? "border-blue-500 scale-110" : "border-transparent"
                }`}
                onClick={() => setSelectedTheme(index)}
              />
            ))}
          </div>
          
          <Button
            className="w-full"
            onClick={generateImage}
            disabled={!text.trim()}
          >
            <Download className="mr-2 h-4 w-4" /> Download Image
          </Button>
        </div>

        <div
          ref={previewRef}
          className={`aspect-square rounded-lg ${THEMES[selectedTheme].bg} ${
            THEMES[selectedTheme].text
          } p-8 flex items-center justify-center text-lg`}
          style={{ textAlign: alignment }}
        >
          {text || "Preview will appear here"}
        </div>
      </div>
    </div>
  );
};

export default TextToImage;