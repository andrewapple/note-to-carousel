import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getImageBreakPositions } from "@/utils/textProcessing";

interface TextControlsProps {
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  alignment: "left" | "center" | "right";
  setAlignment: (alignment: "left" | "center" | "right") => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  maxTotalChars: number;
}

const FONTS = [
  { name: "Georgia", class: "font-georgia" },
  { name: "Palatino", class: "font-palatino" },
  { name: "Helvetica", class: "font-helvetica" },
  { name: "Bookman Old Style", class: "font-bookman" }
];

export const TextControls = ({
  text,
  onTextChange,
  alignment,
  setAlignment,
  selectedFont,
  setSelectedFont,
  maxTotalChars,
}: TextControlsProps) => {
  const imageBreaks = getImageBreakPositions(text);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div className="space-y-4">
      <Textarea
        ref={textareaRef}
        placeholder="Enter your text here... Press Enter twice for line breaks on same image, three times for new image"
        className="min-h-[200px] resize-none whitespace-pre-wrap"
        value={text}
        onChange={onTextChange}
        maxLength={maxTotalChars}
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
          {text.length}/{maxTotalChars} characters
        </span>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Font</label>
        <Select value={selectedFont} onValueChange={setSelectedFont}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {FONTS.map((font) => (
              <SelectItem
                key={font.name}
                value={font.name}
                className={font.class}
              >
                {font.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
