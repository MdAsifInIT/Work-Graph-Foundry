import { landingContent } from "./landingContent";
import { cn } from "./utils";

export function BentoFeatures() {
  return (
    <section className="landing-bento-section max-w-6xl mx-auto px-6 mb-32" aria-label="Landing workflow blocks">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {landingContent.stages.map((stage) => (
          <BentoCard key={stage.id} stage={stage} />
        ))}
      </div>
    </section>
  );
}

function BentoCard({ stage }: { stage: typeof landingContent.stages[0] }) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[32px] p-8 md:p-10",
        "bg-white/70 border border-[#E0F2FE] shadow-[0_8px_24px_rgba(3,105,161,0.05)]",
        "hover:shadow-[0_16px_40px_rgba(3,105,161,0.1)] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1",
        "flex flex-col gap-4 group"
      )}
    >
      <span className="text-sm font-mono text-[#0369A1]">{stage.id}</span>
      <h3 className="text-2xl font-bold text-[#0C4A6E]" style={{ fontFamily: "'Lexend', sans-serif" }}>{stage.title}</h3>
      <p className="text-[#334155] leading-relaxed font-medium">{stage.description}</p>
    </article>
  );
}
