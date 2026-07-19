const STEPS = [
  {
    number: "01",
    title: "Upload PDF",
    description: "Select any PDF from your device. Orion accepts research papers, legal docs, reports — anything.",
  },
  {
    number: "02",
    title: "Process Document",
    description: "The document is chunked, embedded, and indexed into a vector database in seconds.",
  },
  {
    number: "03",
    title: "Ask Questions",
    description: "Type your question naturally. No special syntax, no boolean operators — just ask.",
  },
  {
    number: "04",
    title: "Receive Answers",
    description: "Get precise, context-aware answers with direct references back to the source pages.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#655CFF" }}
          >
            How it Works
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-lg"
            style={{ color: "#071533" }}
          >
            From document to conversation in four steps.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-[60%] right-0 h-px"
                  style={{ backgroundColor: "rgba(7,21,51,0.1)" }}
                />
              )}

              <div className="pr-8 py-4">
                {/* Number */}
                <div
                  className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold"
                  style={{
                    backgroundColor: index === 0 ? "#071533" : "rgba(7,21,51,0.05)",
                    color: index === 0 ? "#DFFF66" : "rgba(7,21,51,0.3)",
                    border: index === 0 ? "none" : "1px solid rgba(7,21,51,0.1)",
                  }}
                >
                  {step.number}
                </div>

                {/* Step label */}
                <div className="flex items-center gap-2 mb-3">
                  <h3
                    className="text-lg font-semibold tracking-tight"
                    style={{ color: "#071533" }}
                  >
                    {step.title}
                  </h3>
                </div>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(7,21,51,0.5)" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div
          className="mt-20 p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{
            backgroundColor: "#071533",
          }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "rgba(223,255,102,0.7)" }}
            >
              The full stack
            </p>
            <p
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#FFF8EC" }}
            >
              Gemini embeddings · Pinecone vectors · RAG pipeline
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {["Gemini", "Pinecone", "RAG"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{
                  backgroundColor: "rgba(255,248,236,0.1)",
                  color: "rgba(255,248,236,0.7)",
                  border: "1px solid rgba(255,248,236,0.12)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
