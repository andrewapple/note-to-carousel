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
    <Carousel>
      <CarouselContent>
        {textChunks.map((chunk, index) => (
          <CarouselItem key={index}>
            <div
              className={`aspect-square rounded-lg ${
                THEMES[selectedTheme].bg
              } p-8 flex items-center justify-center text-lg whitespace-pre-wrap ${
                FONTS.find((f) => f.name === selectedFont)?.class || "serif"
              }`}
              style={{
                textAlign: alignment,
                color: selectedTextColor,
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
      className={`aspect-square rounded-lg ${THEMES[selectedTheme].bg} p-8 flex items-center justify-center text-lg ${
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