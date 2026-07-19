import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What types of PDFs does Orion support?",
    a: "Orion works with any standard PDF — research papers, contracts, technical manuals, reports, books. If it's a valid PDF with selectable text, Orion can process it.",
  },
  {
    q: "How does the semantic search actually work?",
    a: "Orion uses Gemini to convert your document into vector embeddings, which capture the meaning of each passage. When you ask a question, your query is also embedded and matched against these vectors in Pinecone — finding semantically relevant content even if the exact words don't appear.",
  },
  {
    q: "Is my data private and secure?",
    a: "Your documents are processed and stored securely. We never use your documents to train AI models. You have full control over your uploaded files and can delete them at any time.",
  },
  {
    q: "How accurate are the answers?",
    a: "Orion uses a retrieval-augmented generation (RAG) approach, grounding every answer in your actual document content. It also provides source references so you can verify any response directly.",
  },
  {
    q: "Can I upload multiple PDFs and chat across them?",
    a: "Yes. You can upload multiple documents and start separate conversations with each one. Cross-document querying is on the roadmap.",
  },
  {
    q: "Is there a file size limit?",
    a: "Currently Orion supports PDFs up to 50MB. For very large documents, processing may take a few extra seconds.",
  },
];

function AccordionItem({ q, a, isOpen, onClick }) {
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(7,21,51,0.1)" }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4 py-6">
        <h3
          className="text-base font-medium leading-snug"
          style={{ color: "#071533" }}
        >
          {q}
        </h3>
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isOpen ? "#071533" : "transparent",
            border: "1px solid rgba(7,21,51,0.2)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Plus
            size={14}
            style={{ color: isOpen ? "#DFFF66" : "rgba(7,21,51,0.5)" }}
          />
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "200px" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          className="text-sm leading-relaxed pb-6"
          style={{ color: "rgba(7,21,51,0.55)" }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: header */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#FF8A1F" }}
            >
              FAQ
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
              style={{ color: "#071533" }}
            >
              Questions worth asking.
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(7,21,51,0.5)" }}
            >
              Anything else? Reach out via the links in the footer.
            </p>
          </div>

          {/* Right: accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
