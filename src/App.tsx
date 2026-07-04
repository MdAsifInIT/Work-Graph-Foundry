import { useEffect, useState } from "react";
import { AppShell } from "./app/AppShell";
import { type ViewId } from "./app/navigation";
import { useWorkGraphDemoController } from "./app/useWorkGraphDemoController";
import { AnalyzeView } from "./features/analyze/AnalyzeView";
import { ObserveView } from "./features/observe/ObserveView";
import { OverviewView } from "./features/overview/OverviewView";
import { ReviewRunView } from "./features/review-run/ReviewRunView";
import { ReviewView } from "./features/review/ReviewView";

export function App() {
  const controller = useWorkGraphDemoController();
  const [activeView, setActiveView] = useState<ViewId>("overview");
  const [workspaceOpen, setWorkspaceOpen] = useState(() => window.location.hash === "#demo");

  useEffect(() => {
    const syncHash = () => setWorkspaceOpen(window.location.hash === "#demo");

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  if (!workspaceOpen) {
    return <LandingPage controller={controller} onLaunch={() => (window.location.hash = "demo")} />;
  }

  return (
    <AppShell activeView={activeView} controller={controller} onViewChange={setActiveView}>
      {renderView(activeView, controller)}
    </AppShell>
  );
}

function LandingPage({
  controller,
  onLaunch
}: {
  controller: ReturnType<typeof useWorkGraphDemoController>;
  onLaunch: () => void;
}) {
  const { aiProvider, currentStage, scenario, workflowStages } = controller;

  return (
    <main className="landing-page">
      <header className="landing-nav" aria-label="Landing navigation">
        <strong>Work Graph Foundry</strong>
        <button type="button" className="landing-nav-button" onClick={onLaunch}>
          Launch
        </button>
      </header>

      <section className="landing-hero" aria-label="Product landing page">
        <div className="landing-hero-copy">
          <h1>Work Graph Foundry</h1>
          <p className="landing-copy">Find the patterns. Turn them into governed automation.</p>
          <div className="landing-actions">
            <button type="button" className="landing-primary-action" onClick={onLaunch}>
              Launch
            </button>
          </div>
        </div>

        <ProductPreview
          aiProviderLabel={aiProvider.status.available ? "Safe local simulation" : "Safe local preview"}
          currentStageLabel={currentStage?.label ?? "Load Workflow"}
          scenarioLabel={scenario.label}
          scenarioName={scenario.workflowName}
          workflowName={scenario.workflowName}
        />
      </section>

      <section className="landing-section landing-process" aria-label="Landing workflow blocks">
        <article>
          <span>{workflowStages[1]?.index ?? 2}</span>
          <strong>Pattern discovery</strong>
          <p>{workflowStages[1]?.detail ?? "Trace signals surface repeated work, bottlenecks, and exceptions."}</p>
        </article>
        <article>
          <span>{workflowStages[3]?.index ?? 4}</span>
          <strong>Governed proposal</strong>
          <p>{workflowStages[3]?.detail ?? "A reviewable proposal captures policy context, assumptions, and gates."}</p>
        </article>
        <article>
          <span>{workflowStages[6]?.index ?? 7}</span>
          <strong>Safe execution</strong>
          <p>{workflowStages[6]?.detail ?? "Approved runs stay bounded, logged, and reversible."}</p>
        </article>
      </section>
    </main>
  );
}

function ProductPreview({
  aiProviderLabel,
  currentStageLabel,
  scenarioLabel,
  scenarioName,
  workflowName
}: {
  aiProviderLabel: string;
  currentStageLabel: string;
  scenarioLabel: string;
  scenarioName: string;
  workflowName: string;
}) {
  return (
    <aside className="product-preview" aria-label="Work Graph Foundry product preview">
      <div className="preview-topbar">
        <strong>{workflowName}</strong>
        <span>{aiProviderLabel}</span>
      </div>
      <div className="preview-flow" aria-label="Workflow preview flow">
        <div>
          <span>Pattern found</span>
          <strong>{scenarioLabel}</strong>
        </div>
        <div>
          <span>Proposal ready</span>
          <strong>{workflowName}</strong>
        </div>
        <div>
          <span>Approved run</span>
          <strong>{currentStageLabel}</strong>
        </div>
      </div>
      <div className="preview-graph" aria-hidden="true">
        <span data-node="actor">{scenarioName}</span>
        <span data-node="approval">Proposal review</span>
        <span data-node="policy">Approval gate</span>
        <span data-node="action">Approved run</span>
      </div>
      <div className="preview-footer">
        <span>Scenario: {scenarioLabel}</span>
        <span>{aiProviderLabel}</span>
      </div>
    </aside>
  );
}

function renderView(activeView: ViewId, controller: ReturnType<typeof useWorkGraphDemoController>) {
  switch (activeView) {
    case "evidence":
      return <ObserveView controller={controller} />;
    case "graph":
      return <AnalyzeView controller={controller} />;
    case "review-run":
      return <ReviewRunView controller={controller} />;
    case "audit":
      return <ReviewView controller={controller} />;
    case "overview":
    default:
      return <OverviewView controller={controller} />;
  }
}
