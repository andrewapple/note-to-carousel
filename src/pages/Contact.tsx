import { Navigation } from "@/components/Navigation";

const Contact = () => {
  const email = "bearsharkmedia@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      alert("Email copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Caranova</h1>
      <Navigation />

      <div className="prose prose-lg mx-auto">
        <h2 className="text-2xl font-semibold mt-8 mb-4"></h2>

        <p className="mb-6">
          <br />
          I describe <strong>Caranova</strong> as "graphic design with the writer
          in mind". 
          <br />
          <br />
          I built this tool because I wanted to share my writing on Instagram, and the current options for doing that stink.
          I won't read a <em>wall of text</em> caption so why would I post one? I could throw up some <em>Notes App</em> screenshots, but
          people's eyes glaze over the second they see that font. 
          <br />
          <br />
          I created a Canva template, but copying and pasting text into each image while keeping the formatting consistent was a slog.
          The tediousness of it had me on the verge of ring shopping for <em>wall of text</em> captions. 
          <br />
          <br />
          My solution is Caranova, and here is how it works:
          <br />
          <br />
          - write your piece in any text editor
          <br />
          - paste it into the Caranova textbox  
          <br />
          - add a blank line after a sentence by hitting "Enter" twice
          <br />
          - push a sentence to the next card by hitting "Enter" three times
          <br />
          <br />
          The preview box on the right will accurately show <em>what</em> text will be on <em>what</em> card.
          <br />
          <br />
          If you have questions or anything to say, remark, confess,
          whatever, email me at{" "}
          <span
            onClick={copyEmail}
            className="cursor-pointer text-blue-600 underline hover:text-blue-800"
            title="Click to copy email"
          >
            {email}
          </span>
          . Put "Caranova" in the subject line.

        </p>
      </div>
    </div>
  );
};

export default Contact;
