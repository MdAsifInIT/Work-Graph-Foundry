import {
  Activity,
  Brain,
  CheckCircle2,
  Database,
  GitBranch,
  Network,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useMemo, useState } from "react";
import { createAiProvider } from "./ai/providers";
import { recommendLearningUpdate, runApprovedWorkflow } from "./domain/execution";
import { loadDemoFixtures, validateDemoFixtures } from "./domain/fixtures";
import { buildWorkGraph } from "./domain/graph";
import { auditFromGovernance, canExecute, createGovernanceRecord } from "./domain/governance";
import { ingestWorkTraces } from "./domain/ingestion";
import { detectWorkPatterns } from "./domain/patterns";
import { generateAutomationProposal } from "./domain/planner";
import { simulateAutomation } from "./domain/simulation";

const foundationPanels = [
  {
    title: "Work Pattern Clusters",
    icon: Network,
    value: "Awaiting sample load",
    detail: "Repeated IT access flows will appear here after fixture ingestion."
  },
  {
    title: "Work Graph",
    icon: GitBranch,
    value: "Graph canvas ready",
    detail: "Actors, approvals, systems, policy checks, exceptions, and outcomes."
  },
  {
    title: "Agentic Planner",
    icon: Brain,
    value: "Mock provider default",
    detail: "Structured automation proposals will be generated from graph insights."
  },
  {
    title: "Governance",
    icon: ShieldCheck,
    value: "Approval gate configured",
    detail: "Execution remains blocked until an approved proposal exists."
  }
];

export function App() {
  const [sampleLoaded, setSampleLoaded] = useState(false);
  const [approved, setApproved] = useState(false);
  const [runRequested, setRunRequested] = useState(false);
  const aiProvider = useMemo(() => createAiProvider(), []);
  const fixtures = useMemo(() => loadDemoFixtures(), []);
  const validation = useMemo(() => validateDemoFixtures(fixtures), [fixtures]);
  const ingestion = useMemo(
    () => (sampleLoaded ? ingestWorkTraces(fixtures.rawTraces, fixtures.approvalHistory) : undefined),
    [fixtures, sampleLoaded]
  );
  const graph = useMemo(() => (ingestion ? buildWorkGraph(ingestion.items) : undefined), [ingestion]);
  const patternDetection = useMemo(() => (ingestion ? detectWorkPatterns(ingestion.items) : undefined), [ingestion]);
  const sampleItem = ingestion?.items[0];
  const topPattern = patternDetection?.patterns[0];
  const topBottleneck = topPattern
    ? patternDetection?.bottlenecks.find((bottleneck) => bottleneck.patternId === topPattern.id)
    : undefined;
  const topOpportunity = topPattern
    ? patternDetection?.opportunities.find((opportunity) => opportunity.patternId === topPattern.id)
    : undefined;
  const proposal =
    topPattern && graph && topBottleneck && topOpportunity
      ? generateAutomationProposal({
          pattern: topPattern,
          graph,
          policyRules: fixtures.policyRules,
          bottleneck: topBottleneck,
          opportunity: topOpportunity
        })
      : undefined;
  const simulation = proposal && ingestion ? simulateAutomation(proposal, ingestion.items) : undefined;
  const governanceRecords = proposal
    ? [
        createGovernanceRecord({
          proposal,
          decision: "pending",
          reviewerRole: "process_owner",
          comments: "Process owner review opened for low-risk access automation.",
          timestamp: "2026-05-16T10:00:00Z"
        }),
        ...(approved
          ? [
              createGovernanceRecord({
                proposal,
                decision: "approved",
                reviewerRole: "compliance",
                comments: "Approved for low-risk requests with exception escalation.",
                timestamp: "2026-05-16T11:00:00Z"
              })
            ]
          : [])
      ]
    : [];
  const executionReady = proposal ? canExecute(governanceRecords, proposal) : false;
  const auditEvents = governanceRecords.map(auditFromGovernance);
  const executionRun =
    proposal && runRequested
      ? runApprovedWorkflow({
          proposal,
          requestTrace: fixtures.newIncomingTrace,
          approved: executionReady
        })
      : undefined;
  const learningRecommendation =
    simulation && executionRun ? recommendLearningUpdate({ simulation, execution: executionRun }) : undefined;
  const resetDemo = () => {
    setSampleLoaded(false);
    setApproved(false);
    setRunRequested(false);
  };

  return (
    <main className="app-shell">
      <section className="topbar" aria-label="Demo controls">
        <div>
          <p className="eyebrow">Work Graph Foundry</p>
          <h1>Enterprise Work Intelligence Console</h1>
        </div>
        <div className="toolbar">
          <button
            type="button"
            aria-label="Load sample traces"
            title="Load sample traces"
            onClick={() => setSampleLoaded(true)}
          >
            <Database size={18} />
            <span>Load Sample</span>
          </button>
          <button
            type="button"
            aria-label="Run new request"
            title="Run new request"
            onClick={() => setRunRequested(true)}
          >
            <Play size={18} />
            <span>Run Case</span>
          </button>
          <button type="button" aria-label="Reset demo" title="Reset demo" onClick={resetDemo}>
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
        </div>
      </section>

      <section className="demo-strip" aria-label="Scripted demo path">
        <span>1 Load traces</span>
        <span>2 Discover pattern</span>
        <span>3 Inspect graph</span>
        <span>4 Simulate</span>
        <span>5 Approve</span>
        <span>6 Run case</span>
        <span>7 Improve</span>
      </section>

      <section className="status-grid" aria-label="System status">
        <div className="metric">
          <Activity size={18} />
          <span>Phase 09</span>
          <strong>{sampleLoaded ? "Observed traces" : "Foundation"}</strong>
        </div>
        <div className="metric">
          <Sparkles size={18} />
          <span>AI mode</span>
          <strong>{aiProvider.status.label}</strong>
        </div>
        <div className="metric">
          <ShieldCheck size={18} />
          <span>Execution</span>
          <strong>Governed</strong>
        </div>
        <div className="metric">
          <CheckCircle2 size={18} />
          <span>Fixture validation</span>
          <strong>{validation.valid ? "Valid" : "Needs review"}</strong>
        </div>
      </section>

      {ingestion ? (
        <section className="ingestion-summary" aria-label="Ingestion summary">
          <div>
            <span>Raw traces</span>
            <strong>{ingestion.summary.rawTraceCount}</strong>
          </div>
          <div>
            <span>Normalized items</span>
            <strong>{ingestion.summary.normalizedItemCount}</strong>
          </div>
          <div>
            <span>Warnings</span>
            <strong>{ingestion.summary.issueCount}</strong>
          </div>
          <div>
            <span>Top system</span>
            <strong>Salesforce</strong>
          </div>
        </section>
      ) : null}

      <section className="dashboard-grid" aria-label="Operating dashboard">
        {foundationPanels.map((panel) => {
          const Icon = panel.icon;
          return (
            <article className="panel" key={panel.title}>
              <div className="panel-heading">
                <Icon size={18} />
                <h2>{panel.title}</h2>
              </div>
              <p className="panel-value">{panel.value}</p>
              <p className="panel-detail">{panel.detail}</p>
            </article>
          );
        })}
      </section>

      {sampleItem ? (
        <section className="evidence-panel" aria-label="Raw to normalized evidence">
          <div>
            <p className="eyebrow">Observed evidence</p>
            <h2>Raw trace to normalized work item</h2>
          </div>
          <div className="evidence-grid">
            <article>
              <h3>{fixtures.rawTraces[0].subject}</h3>
              <p>{fixtures.rawTraces[0].body}</p>
            </article>
            <article>
              <h3>{sampleItem.requester}</h3>
              <dl>
                <div>
                  <dt>Department</dt>
                  <dd>{sampleItem.requesterDepartment}</dd>
                </div>
                <div>
                  <dt>Request type</dt>
                  <dd>{sampleItem.requestType.replaceAll("_", " ")}</dd>
                </div>
                <div>
                  <dt>System</dt>
                  <dd>{sampleItem.systems.join(", ")}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{sampleItem.status.replaceAll("_", " ")}</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>
      ) : null}

      {graph ? (
        <section className="graph-panel" aria-label="Generated work graph">
          <div className="graph-header">
            <div>
              <p className="eyebrow">Work graph</p>
              <h2>IT access request flow</h2>
            </div>
            <div className="graph-metrics">
              <span>{graph.metrics.approvalDelayHours}h approval delay</span>
              <span>{Math.round(graph.metrics.exceptionRate * 100)}% exception rate</span>
              <span>{graph.metrics.averageCycleTimeHours}h cycle time</span>
            </div>
          </div>
          <ol className="graph-steps">
            {graph.nodes.map((node) => (
              <li key={node.id} data-risk={node.riskLevel}>
                <strong>{node.label}</strong>
                <span>
                  {node.count} cases · {node.kind}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {patternDetection ? (
        <section className="pattern-panel" aria-label="Detected work patterns">
          <div className="graph-header">
            <div>
              <p className="eyebrow">Pattern detection</p>
              <h2>Repeated workflows and automation opportunities</h2>
            </div>
            {topOpportunity ? <strong className="opportunity-score">{Math.round(topOpportunity.score * 100)} opportunity</strong> : null}
          </div>
          <div className="pattern-grid">
            <div className="pattern-list">
              {patternDetection.patterns.map((pattern) => (
                <article key={pattern.id} className={pattern.id === topPattern?.id ? "selected" : undefined}>
                  <strong>{pattern.label}</strong>
                  <span>
                    {pattern.volume} cases · {Math.round(pattern.repeatabilityScore * 100)} repeatability · {pattern.riskLevel} risk
                  </span>
                </article>
              ))}
            </div>
            <div className="insight-card">
              <h3>{topBottleneck?.label}</h3>
              <p>{topBottleneck?.evidence}</p>
              <dl>
                <div>
                  <dt>Average delay</dt>
                  <dd>{topBottleneck?.averageDelayHours}h</dd>
                </div>
                <div>
                  <dt>Value</dt>
                  <dd>{topOpportunity?.valueSummary}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      ) : null}

      {proposal ? (
        <section className="proposal-panel" aria-label="Automation proposal">
          <div className="graph-header">
            <div>
              <p className="eyebrow">Agentic workflow planner</p>
              <h2>Governed automation proposal</h2>
            </div>
            <strong className="opportunity-score">{Math.round(proposal.confidence * 100)} confidence</strong>
          </div>
          <div className="proposal-grid">
            <article>
              <h3>Trigger</h3>
              <p>{proposal.trigger}</p>
            </article>
            <article>
              <h3>Policy checks</h3>
              <ul>
                {proposal.policyChecks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Actions</h3>
              <ul>
                {proposal.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Escalations</h3>
              <ul>
                {proposal.escalations.map((escalation) => (
                  <li key={escalation}>{escalation}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="audit-rationale">{proposal.auditRationale}</p>
        </section>
      ) : null}

      {simulation && proposal ? (
        <section className="simulation-panel" aria-label="Simulation and governance">
          <div className="graph-header">
            <div>
              <p className="eyebrow">Simulation and governance</p>
              <h2>Historical replay before execution</h2>
            </div>
            <button className="approve-button" type="button" onClick={() => setApproved(true)}>
              <ShieldCheck size={16} />
              <span>{approved ? "Approved" : "Approve"}</span>
            </button>
          </div>
          <div className="simulation-grid">
            <article>
              <span>Pass</span>
              <strong>{simulation.passed}</strong>
            </article>
            <article>
              <span>Needs human</span>
              <strong>{simulation.needsHuman}</strong>
            </article>
            <article>
              <span>Policy risk</span>
              <strong>{simulation.policyRisk}</strong>
            </article>
            <article>
              <span>Execution gate</span>
              <strong>{executionReady ? "Open" : "Blocked"}</strong>
            </article>
            <article>
              <span>Avoided delay</span>
              <strong>{simulation.avoidedDelayHours}h</strong>
            </article>
          </div>
          <div className="audit-log">
            <h3>Audit log</h3>
            {auditEvents.map((event) => (
              <p key={event.id}>
                <strong>{event.action}</strong> · {event.actor.replace("_", " ")} · {event.detail}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {proposal ? (
        <section className="execution-panel" aria-label="Execution and learning loop">
          <div className="graph-header">
            <div>
              <p className="eyebrow">Execution layer</p>
              <h2>Approved workflow runner</h2>
            </div>
            <strong className="opportunity-score">{executionRun?.status ?? "ready"}</strong>
          </div>
          <div className="execution-grid">
            <article>
              <h3>Incoming request</h3>
              <p>{fixtures.newIncomingTrace.body}</p>
            </article>
            <article>
              <h3>Mock tool calls</h3>
              {executionRun?.mockToolCalls.length ? (
                <ul>
                  {executionRun.mockToolCalls.map((call) => (
                    <li key={call.tool}>
                      <strong>{call.tool}</strong>: {call.output}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{executionRun ? executionRun.auditTrail[0] : "Run the new case after approval."}</p>
              )}
            </article>
            <article>
              <h3>Learning loop</h3>
              <p>
                {learningRecommendation
                  ? `${learningRecommendation.recommendation} ${learningRecommendation.expectedImpact}`
                  : "Learning recommendation appears after a run."}
              </p>
            </article>
          </div>
        </section>
      ) : null}
    </main>
  );
}
