import { Navigation } from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <Navigation />
      
      <div className="prose prose-lg mx-auto">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Get in Touch</h2>
        <p className="mb-6">
          We'd love to hear from you! Whether you have questions about using Carousel, 
          want to report a bug, or just want to share your feedback, please don't 
          hesitate to reach out. You can contact our team through our support channels 
          and we'll get back to you as soon as possible.
        </p>
      </div>
    </div>
  );
};

export default Contact;