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
  THEMES: Array<{ bg: string; text: string }>;
  FONTS: Array<{ name: string; class: string }>;
}

export const PreviewCarousel = ({
  textChunks,
  selectedTheme,
  selectedFont,
  selectedTextColor,
  alignment,
  THEMES,
  FONTS,
}: PreviewCarouselProps) => {
  return textChunks.length > 0 ? (
    <Carousel className="w-full aspect-square">
      <CarouselContent>
        {textChunks.map((chunk, index) => (
          <CarouselItem key={index}>
            <div
              className={`w-full aspect-square rounded-lg ${
                THEMES[selectedTheme].bg
              } p-8 flex items-center justify-center text-lg overflow-auto ${
                FONTS.find((f) => f.name === selectedFont)?.class || "serif"
              }`}
              style={{
                textAlign: alignment,
                color: selectedTextColor,
              }}
            >
              <div className="max-h-full overflow-y-auto">
                {chunk}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ) : (
    <div
      className={`w-full aspect-square rounded-lg ${THEMES[selectedTheme].bg} p-8 flex items-center justify-center text-lg ${
        FONTS.find((f) => f.name === selectedFont)?.class || "serif"
      }`}
      style={{
        textAlign: alignment,
        color: selectedTextColor,
      }}
    >
      Preview will appear here
    </div>
  );
};