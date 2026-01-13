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
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <Navigation />

      <div className="prose prose-lg mx-auto">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Get in Touch</h2>

        <p className="mb-6">
          Hi! My name is Andrew Apple, and I hope you are enjoying my nifty little
          web app. If you have questions or anything to say, remark, confess,
          whatever, email me at{" "}
          <span
            onClick={copyEmail}
            className="cursor-pointer text-blue-600 underline hover:text-blue-800"
            title="Click to copy email"
          >
            {email}
          </span>
          . Put "Caranova" in the subject line.
          <br />
          <br />
          I describe <strong>Caranova</strong> as "graphic design with the writer
          in mind". It offers some room for creativity, but none more than you
          would have were you to traditionally publish a book. You can choose
          from a small list of font and background options. Here is how it works:
          <br />
          <br />
          You write your blog or article in the text editor of your choice. When
          you are finished, paste the entire piece into the Caranova textbox. If
          you were to then click "Download Images", you would get a zip file with
          Instagram-ready carousel cards with the text split into groups of 600
          characters.
          <br />
          <br />
          However, the creative artist you are, you probably want to control what
          goes where. Maybe you have a sentence that carries a punch, and you
          want it to have its own card. Add a blank line between two sentences or
          paragraphs by hitting "Enter" twice. If you want to push a sentence to
          the next card, hit "Enter" three times. If this is confusing, the
          preview box on the right will accurately show what text will be on what
          card. It is an exact preview of what you will be downloading.
          <br />
          <br />
          If you don't hate this niche tool, consider a visit to my quotes app{" "}
          <a href="https://hmmmpops.netlify.app/" target="_blank" rel="noreferrer">
            Hmmmpops
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Contact;
