import { Navigation } from "@/components/Navigation";

const About = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">About Carousel</h1>
      <Navigation />
      
      <div className="prose prose-lg mx-auto">
        <h2 className="text-2xl font-semibold mt-8 mb-4">What is Carousel?</h2>
        <p className="mb-6">
          Carousel is a powerful tool designed to help you transform your text into beautiful, 
          shareable social media images. Whether you're creating content for Instagram, Twitter, 
          or any other platform, Carousel makes it easy to turn your words into visually 
          appealing carousel posts.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How to Use</h2>
        <p className="mb-6">
          Simply paste or type your text into the editor. The app automatically splits your content 
          into perfectly sized chunks for social media. You can customize the appearance with 
          different fonts, colors, and alignments. When you're satisfied with the preview, 
          download your images individually or as a zip file.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
        <p className="mb-6">
          Carousel offers a range of features to make your content stand out. Choose from various 
          background colors, customize your text alignment, and select from different font options. 
          The live preview allows you to see exactly how your posts will look before downloading. 
          Multiple slides are automatically created when your text exceeds the character limit 
          for a single post.
        </p>
      </div>
    </div>
  );
};

export default About;