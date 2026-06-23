import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the dashboard-first foundation shell", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /Enterprise Work Intelligence Console/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Load sample traces/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset demo/i })).toBeInTheDocument();
    expect(screen.getByText(/1 Load traces/i)).toBeInTheDocument();
    expect(screen.getByText(/Work Pattern Clusters/i)).toBeInTheDocument();
    expect(screen.getByText(/Deterministic mock/i)).toBeInTheDocument();
  });

  it("loads sample traces and shows normalized evidence", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Load sample traces/i }));

    expect(screen.getByText("Raw traces")).toBeInTheDocument();
    expect(screen.getByText("Normalized items")).toBeInTheDocument();
    expect(screen.getByText(/Raw trace to normalized work item/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Maya Chen" })).toBeInTheDocument();
    expect(screen.getByText(/standard access/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /IT access request flow/i })).toBeInTheDocument();
    expect(screen.getByText("Manager approval")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Repeated workflows and automation opportunities/i })).toBeInTheDocument();
    expect(screen.getByText(/Manager approval delay/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Governed automation proposal/i })).toBeInTheDocument();
    expect(screen.getByText(/Write immutable audit event/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Historical replay before execution/i })).toBeInTheDocument();
    expect(screen.getByText("Blocked")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Approve/i }));

    expect(screen.getByText("Open")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Run new request/i }));

    expect(screen.getByRole("heading", { name: /Approved workflow runner/i })).toBeInTheDocument();
    expect(screen.getByText(/provisioning task WGF-2001 created/i)).toBeInTheDocument();
    expect(screen.getByText(/human-review lane/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Reset demo/i }));

    expect(screen.queryByRole("heading", { name: /Approved workflow runner/i })).not.toBeInTheDocument();
  });
});
