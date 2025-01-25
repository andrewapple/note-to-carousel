import { generateImage } from "@/utils/imageGeneration";
import JSZip from "jszip";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGeneratorProps {
  text: string;
  textChunks: string[];
  selectedTheme: number;
  selectedFont: string;
  selectedTextColor: string;
  alignment: "left" | "center" | "right";
}

export const ImageGenerator = ({
  text,
  textChunks,
  selectedTheme,
  selectedFont,
  selectedTextColor,
  alignment,
}: ImageGeneratorProps) => {
  const handleDownload = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text first!");
      return;
    }

    try {
      console.log("Starting image generation for chunks:", textChunks);
      
      // Generate all images in parallel and wait for all to complete
      const blobPromises = textChunks.map((chunk, index) => {
        console.log(`Generating image ${index + 1} for chunk:`, chunk);
        return generateImage(chunk, selectedTheme, selectedFont, selectedTextColor, alignment)
          .then(blob => {
            if (!blob) {
              console.error(`Failed to generate image ${index + 1}`);
              throw new Error(`Failed to generate image ${index + 1}`);
            }
            console.log(`Successfully generated image ${index + 1}`);
            return blob;
          });
      });

      const blobs = await Promise.all(blobPromises);
      console.log(`Generated ${blobs.length} images successfully`);

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
      } else if (blobs[0]) {
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
    <Button
      className="w-full"
      onClick={handleDownload}
      disabled={!text.trim()}
    >
      <Download className="mr-2 h-4 w-4" /> Download Images
    </Button>
  );
};