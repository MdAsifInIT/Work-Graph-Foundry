import {
  Brain,
  Database,
  Network
} from "lucide-react";
import type { ReactNode } from "react";
import { ToolbarButton } from "../components/shared/ToolbarButton";
import type { ScenarioId } from "../domain/types";
import { navigationItems, type ViewId } from "./navigation";
import type { WorkGraphDemoController } from "./useWorkGraphDemoController";

interface AppShellProps {
  activeView: ViewId;
  children: ReactNode;
  controller: WorkGraphDemoController;
  onViewChange: (viewId: ViewId) => void;
}

export function AppShell({ activeView, children, controller, onViewChange }: AppShellProps) {
  const { actions, demoState, executionReady, proposalGenerationReady, scenario, scenarioOptions } = controller;
  const activeNavigationItem = navigationItems.find((item) => item.id === activeView) ?? navigationItems[0];

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-block">
          <p className="eyebrow">Work Graph Foundry</p>
          <strong>Workspace</strong>
        </div>
        <nav className="menu-list">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                aria-current={activeView === item.id ? "page" : undefined}
                onClick={() => onViewChange(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="main-shell">
        <section className="topbar" aria-label="Workflow controls">
          <div className="topbar-title">
            <p className="eyebrow">{activeNavigationItem.label}</p>
            <h1>Work Graph Foundry</h1>
            <p className="topbar-summary">{activeNavigationItem.purpose}</p>
            <p className="topbar-meta" aria-label="Workflow context">
              Scenario: {scenario.label} · Step: {activeNavigationItem.label} · Gate:{" "}
              {executionReady ? "Ready to run" : "Approval needed"}
            </p>
          </div>
          <div className="mobile-view-picker">
            <label>
              <span>View</span>
              <select
                aria-label="Select app view"
                value={activeView}
                onChange={(event) => onViewChange(event.target.value as ViewId)}
              >
                {navigationItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="toolbar">
            <div className="toolbar-row toolbar-row-primary" aria-label="Primary workflow controls">
              <label className="scenario-picker">
                <span>Workflow</span>
                <select
                  aria-label="Select workflow"
                  value={demoState.selectedScenarioId}
                  onChange={(event) => {
                    actions.selectScenario(event.target.value as ScenarioId);
                    onViewChange("overview");
                  }}
                >
                  {scenarioOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <ToolbarButton
                icon={Database}
                aria-label="Load workflow"
                title="Load workflow"
                className="toolbar-button-primary"
                onClick={() => {
                  actions.loadSelectedScenario();
                  onViewChange("evidence");
                }}
              >
                Load Workflow
              </ToolbarButton>
              <ToolbarButton
                icon={Network}
                aria-label="Analyze workflow"
                title="Analyze workflow"
                className="toolbar-button-primary"
                disabled={!demoState.sampleLoaded}
                onClick={() => {
                  actions.analyzeWorkflow();
                  onViewChange("graph");
                }}
              >
                Analyze
              </ToolbarButton>
              <ToolbarButton
                icon={Brain}
                aria-label="Generate automation proposal"
                title="Generate automation proposal"
                className="toolbar-button-primary"
                disabled={!demoState.analysisRequested || !proposalGenerationReady}
                onClick={() => {
                  actions.generateProposalFromCurrentState();
                  onViewChange("review-run");
                }}
              >
                Generate Proposal
              </ToolbarButton>
            </div>
          </div>
        </section>

        <div className="view-content">{children}</div>
      </main>
    </div>
  );
}
