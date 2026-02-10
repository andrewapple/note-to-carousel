import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PreviewCarouselProps {
  textChunks: string[];
  selectedTheme: number;
  selectedFont: string;
  selectedTextColor: string;
  alignment: "left" | "center" | "right";
  selectedFontSize: number;
  THEMES: Array<{ bg: string; text: string }>;
  FONTS: Array<{ name: string; class: string }>;
  FONT_SIZES: Array<{ name: string; size: number; lineHeight: number }>;
}

export const PreviewCarousel = ({
  textChunks,
  selectedTheme,
  selectedFont,
  selectedTextColor,
  alignment,
  selectedFontSize,
  THEMES,
  FONTS,
  FONT_SIZES,
}: PreviewCarouselProps) => {

  const previewFontSize = `${FONT_SIZES[selectedFontSize].size * 0.35}px`;
  
  return textChunks.length > 0 ? (
    <Carousel>
      <CarouselContent>
        {textChunks.map((chunk, index) => (
          <CarouselItem key={index}>
            <div
              className={`aspect-square rounded-lg ${
                THEMES[selectedTheme].bg
              } p-8 flex items-center justify-center whitespace-pre-wrap ${
                FONTS.find((f) => f.name === selectedFont)?.class || "serif"
              }`}
              style={{
                textAlign: alignment,
                color: selectedTextColor,
                fontSize: previewFontSize,
              }}
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
      className={`aspect-square rounded-lg ${THEMES[selectedTheme].bg} p-8 flex items-center justify-center ${
        FONTS.find((f) => f.name === selectedFont)?.class || "serif"
      }`}
      style={{
        textAlign: alignment,
        color: selectedTextColor,
        fontSize: previewFontSize,
      }}
    >
      Preview will appear here
    </div>
  );
};
