import { motion } from "framer-motion";
import { useState } from "react";
import { landingContent } from "./landingContent";

interface WorkGraphAnimationProps {
  onPrepareWorkspace: () => void;
}

export function WorkGraphAnimation({ onPrepareWorkspace }: WorkGraphAnimationProps) {
  const { aiProviderLabel, scenarioLabel, scenarioName } = landingContent.preview;
  const [connectorActive, setConnectorActive] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onViewportEnter={() => {
        setConnectorActive(true);
        onPrepareWorkspace();
      }}
      onViewportLeave={() => setConnectorActive(false)}
      className={`landing-workgraph-section ${connectorActive ? "landing-workgraph-active" : ""} w-full max-w-5xl mx-auto px-6 mb-32`}
      aria-label="Workflow visualization"
    >
      <div className="relative w-full rounded-[40px] bg-white/55 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0369A1]/10 to-transparent pointer-events-none" />
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 relative z-10 gap-4">
          <h2 className="text-2xl font-bold text-[#020617]" style={{ fontFamily: "'Lexend', sans-serif" }}>{scenarioName}</h2>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/80 px-4 py-2 rounded-full text-[#0369A1] border border-white shadow-sm">
            {aiProviderLabel}
          </span>
        </div>

        {/* Abstract Workflow Visual */}
        <div className="landing-workgraph relative h-64 md:h-80 w-full flex items-center justify-center" aria-label="Samruna product preview">
          <div className="landing-workgraph-connector" aria-hidden="true">
            <span className="landing-workgraph-flow" />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10" aria-label="Connected automation path">
            <Node title="Pattern found" subtitle={scenarioLabel} />
            <Node title="Proposal ready" subtitle="Governed proposal" />
            <Node title="Execution gated" subtitle="Approval required" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Node({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-white shadow-md hover:shadow-lg transition-[transform,box-shadow,border-color,background-color] duration-300">
      <span className="text-sm font-bold text-[#020617] mb-1">{title}</span>
      <span className="text-xs font-medium text-[#404040]">{subtitle}</span>
    </div>
  );
}
