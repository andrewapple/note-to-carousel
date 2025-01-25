import { useState } from "react";
import { splitTextIntoChunks, MAX_TOTAL_CHARS } from "@/utils/textProcessing";
import { TextControls } from "./text-to-image/TextControls";
import { ColorSettings } from "./text-to-image/ColorSettings";
import { PreviewCarousel } from "./text-to-image/PreviewCarousel";
import { ImageGenerator } from "./text-to-image/ImageGenerator";

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

          <ImageGenerator
            text={text}
            textChunks={textChunks}
            selectedTheme={selectedTheme}
            selectedFont={selectedFont}
            selectedTextColor={selectedTextColor}
            alignment={alignment}
          />
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
