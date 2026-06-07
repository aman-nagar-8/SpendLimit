"use client"
import React from 'react'
import {Info} from "@/components/shareAudit/Info"
import { StatCard } from '@/components/shareAudit/StateCard'
import { Metric } from '@/components/shareAudit/Metric'
import Navbar from '@/components/Navbar'

 function page() {
  const audit = {
    id: "7f9k3m",
    currentSpend: 1420,
    monthlySavings: 640,
    annualSavings: 7680,
    score: 74,
    views: 284,
    shares: 17,
    tools: ["Cursor", "ChatGPT", "Claude"],
  };

  return (
    <div className="min-h-screen bg-black">
        <Navbar/>
      <div className="mx-auto max-w-7xl px-6 py-4">
        <HeroSection audit={audit} />
        <ActionBar auditId={audit.id} />
        <SummaryCard />
        <SavingsSnapshot audit={audit} />
        <ToolBreakdown />
        <Recommendations />
        <BenchmarkCard />
        <TrustSection audit={audit} />
        <ShareSection auditId={audit.id} />
        <CredexCTA savings={audit.monthlySavings} />
        <RunAuditCTA />
      </div>
    </div>
  );
}

function ActionBar({ auditId }: any) {
  const shareUrl =
    `${process.env.URL}/${auditId}`;

  const copyLink =  async () => {
    await navigator.clipboard.writeText(
      shareUrl,
    );
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">

      <button
        onClick={copyLink}
        className="
        rounded-xl
        border border-zinc-700
        px-5 py-3
        text-white
      "
      >
        Copy Link
      </button>

      <button
        className="
        rounded-xl
        border border-zinc-700
        px-5 py-3
        text-white
      "
      >
        Download Image
      </button>

      <button
        className="
        rounded-xl
        border border-zinc-700
        px-5 py-3
        text-white
      "
      >
        Download PDF
      </button>

    </div>
  );
}

function RunAuditCTA() {
  return (
    <div
      className="
      mt-8
      rounded-3xl
      border border-zinc-800
      bg-zinc-950
      p-10
      text-center
    "
    >
      <h2 className="text-4xl font-bold text-white">
        Run Your Own AI Audit
      </h2>

      <p className="mt-4 text-zinc-400">
        Discover savings opportunities
        in under 2 minutes.
      </p>

      <button
        className="
        mt-6
        rounded-xl
        bg-white
        px-8 py-4
        text-black
        font-semibold
      "
      >
        Start Free Audit
      </button>
    </div>
  );
}
function HeroSection({ audit }: any) {
  return (
    <div
      className="
      relative overflow-hidden
      rounded-3xl
      border border-red-500/10
      bg-zinc-950
      p-10
    "
    >
      <div className="absolute inset-0 bg-linear-to-r from-red-500/5 to-transparent" />

      <div className="relative">
        <div className="text-red-500 text-sm font-medium">
          PUBLIC AI SPEND AUDIT
        </div>

        <h1 className="mt-4 text-6xl font-bold text-white">
          ${audit.monthlySavings}
          <span className="text-zinc-500 text-3xl">
            /month
          </span>
        </h1>

        <p className="mt-2 text-zinc-400">
          Potential Savings Identified
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard
            label="Annual Savings"
            value={`$${audit.annualSavings}`}
          />

          <StatCard
            label="Efficiency Score"
            value={`${audit.score}/100`}
          />

          <StatCard
            label="Current Spend / Month"
            value={`$${audit.currentSpend}`}
          />
        </div>
      </div>
    </div>
  );
}
function SavingsSnapshot({
  audit,
}: any) {
  return (
    <div
      className="
      mt-8
      rounded-3xl
      border border-zinc-800
      bg-zinc-950
      p-8
    "
    >
      <h2 className="text-xl font-semibold text-white">
        Savings Snapshot
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-4">

        <Metric
          label="Current Spend"
          value={`$${audit.currentSpend}`}
        />

        <Metric
          label="Recommended Spend"
          value={`$${
            audit.currentSpend -
            audit.monthlySavings
          }`}
        />

        <Metric
          label="Monthly Savings"
          value={`$${audit.monthlySavings}`}
        />

        <Metric
          label="Annual Savings"
          value={`$${audit.annualSavings}`}
        />

      </div>
    </div>
  );
}

function ShareSection({
  auditId,
}: any) {
  const url =
    `${process.env.URL}/audit/${auditId}`;

  return (
    <div
      className="
      mt-8
      rounded-3xl
      border border-zinc-800
      bg-zinc-950
      p-8
    "
    >
      <h2 className="text-white text-xl font-semibold">
        Share This Audit
      </h2>

      <p className="mt-2 text-zinc-400">
        Help other teams discover AI
        savings opportunities.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">

        <a
          href={`https://twitter.com/intent/tweet?text=`}
          target="_blank"
        >
          <button className="rounded-xl bg-zinc-900 px-5 py-3 text-white">
            Share on X
          </button>
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url`}
          target="_blank"
        >
          <button className="rounded-xl bg-zinc-900 px-5 py-3 text-white">
            LinkedIn
          </button>
        </a>

        <button
          onClick={() =>
            navigator.clipboard.writeText(url)
          }
          className="
          rounded-xl
          bg-red-600
          px-5 py-3
          text-white
        "
        >
          Copy Link
        </button>

      </div>
    </div>
  );
}


function TrustSection({
  audit,
}: any) {
  return (
    <div
      className="
      mt-8
      rounded-3xl
      border border-zinc-800
      bg-zinc-950
      p-8
    "
    >
      <h2 className="text-white text-xl font-semibold">
        Audit Metadata
      </h2>

      <div className="mt-6 grid md:grid-cols-2 gap-4">

        <Info
          label="Audit ID"
          value={audit.id}
        />

        <Info
          label="Views"
          value={audit.views}
        />

        <Info
          label="Shares"
          value={audit.shares}
        />

        <Info
          label="Tools Audited"
          value={audit.tools.join(", ")}
        />

      </div>
    </div>
  );
}

function CredexCTA({
  savings,
}: {
  savings: number;
}) {
  if (savings < 500) return null;

  return (
    <div
      className="
      mt-8
      rounded-3xl
      border border-red-500/20
      bg-red-500/5
      p-8
    "
    >
      <h2 className="text-3xl font-bold text-white">
        You're leaving ${savings}/month
        on the table.
      </h2>

      <p className="mt-3 text-zinc-300">
        Credex continuously monitors
        AI spending and identifies
        new optimization opportunities.
      </p>

      <button
        className="
        mt-6
        rounded-xl
        bg-red-600
        px-6 py-3
        text-white
      "
      >
        Explore Credex
      </button>
    </div>
  );
}

function SummaryCard() {
  return (
    <div
      className="
        mt-8
        rounded-3xl
        border border-zinc-800
        bg-zinc-950
        p-8
      "
    >
      <h2 className="text-xl font-semibold text-white">
        Personalized Summary
      </h2>

      <p className="mt-4 leading-8 text-zinc-300">
        Your team currently spends
        <span className="font-medium text-white">
          {" "} $1,420/month{" "}
        </span>
        across AI tooling.

        Most of your spend is concentrated in
        Cursor Business and ChatGPT Team.

        Compared to similar engineering teams,
        your cost per seat appears higher than
        average.

        The largest opportunities come from
        removing underutilized licenses and
        consolidating overlapping workflows.

        Estimated savings:
        <span className="font-medium text-green-400">
          {" "} $640/month{" "}
        </span>
        ($7,680/year).
      </p>
    </div>
  );
}

function ToolBreakdown() {
  const tools = [
    {
      tool: "Cursor Business",
      spend: 400,
      savings: 120,
      action: "Reduce seats from 10 → 7",
      reason:
        "3 seats appear underutilized compared with team size.",
    },
    {
      tool: "ChatGPT Team",
      spend: 375,
      savings: 240,
      action:
        "Consolidate research workflows",
      reason:
        "Significant overlap detected with Claude usage.",
    },
    {
      tool: "Claude Team",
      spend: 180,
      savings: 280,
      action:
        "Downgrade unused seats",
      reason:
        "Multiple seats show low estimated utilization.",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white">
        Tool Breakdown
      </h2>

      <div className="mt-6 space-y-5">
        {tools.map((tool) => (
          <div
            key={tool.tool}
            className="
              rounded-3xl
              border border-zinc-800
              bg-zinc-950
              p-6
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {tool.tool}
                </h3>

                <p className="mt-1 text-zinc-500">
                  Current Spend:
                  ${tool.spend}/month
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">
                  ${tool.savings}
                </p>

                <p className="text-sm text-zinc-500">
                  Monthly Savings
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-zinc-900/50 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Recommended Action
              </p>

              <p className="mt-2 text-white">
                {tool.action}
              </p>
            </div>

            <p className="mt-4 text-zinc-400">
              {tool.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Recommendations() {
  const recommendations = [
    {
      title:
        "Remove unused Cursor licenses",
      savings: 120,
    },
    {
      title:
        "Consolidate research workflows",
      savings: 240,
    },
    {
      title:
        "Downgrade inactive Claude seats",
      savings: 280,
    },
  ];

  return (
    <div
      className="
        mt-8
        rounded-3xl
        border border-zinc-800
        bg-zinc-950
        p-8
      "
    >
      <h2 className="text-xl font-semibold text-white">
        Top Opportunities
      </h2>

      <div className="mt-6 space-y-4">
        {recommendations.map(
          (item, index) => (
            <div
              key={item.title}
              className="
                flex items-center justify-between
                rounded-2xl
                border border-zinc-800
                p-5
              "
            >
              <div>
                <div className="text-zinc-500">
                  #{index + 1}
                </div>

                <div className="mt-1 text-white">
                  {item.title}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-green-400">
                  ${item.savings}
                </div>

                <div className="text-xs text-zinc-500">
                  per month
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function BenchmarkCard() {
  const yourCostPerSeat = 57;
  const industryAverage = 43;

  return (
    <div
      className="
        mt-8
        rounded-3xl
        border border-zinc-800
        bg-zinc-950
        p-8
      "
    >
      <h2 className="text-xl font-semibold text-white">
        Industry Benchmark
      </h2>

      <p className="mt-2 text-zinc-400">
        Compare your AI spending against
        similar engineering teams.
      </p>

      <div className="mt-8 space-y-6">

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-zinc-300">
              Your Team
            </span>

            <span className="text-white font-medium">
              ${yourCostPerSeat}/seat
            </span>
          </div>

          <div className="h-3 rounded-full bg-zinc-800">
            <div
              className="h-3 rounded-full bg-red-500"
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-zinc-300">
              Industry Average
            </span>

            <span className="text-white font-medium">
              ${industryAverage}/seat
            </span>
          </div>

          <div className="h-3 rounded-full bg-zinc-800">
            <div
              className="h-3 rounded-full bg-zinc-500"
              style={{
                width: `${
                  (industryAverage /
                    yourCostPerSeat) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-red-500/10 bg-red-500/3 p-4">
        <p className="text-zinc-300">
          Your current AI spend per seat is
          approximately
          <span className="font-medium text-white">
            {" "}33% higher{" "}
          </span>
          than comparable teams.
        </p>
      </div>
    </div>
  );
}
export default page
