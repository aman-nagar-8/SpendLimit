import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  DollarSign,
  TrendingDown,
  Sparkles,
} from "lucide-react";
import { AuditResult } from "@/auditEngine/auditEngineV1";



// export interface AuditResult {
//   monthlySavings: number;
//   annualSavings: number;
//   score:number;
//   industryAvg:number;

//   spendPerEmployee: number;


//   benchmarkStatus:
//     | "under"
//     | "within"
//     | "over";

//   status:
//     | "credex_opportunity"
//     | "optimization_found"
//     | "already_optimized";

//   recommendations: Recommendation[];
// }

// export interface Recommendation {
//   tool: string;

//   currentSpend: number;

//   recommendationType:
//     | "downgrade"
//     | "alternative"
//     | "api_replacement"
//     | "keep";

//   currentPlan: string;

//   recommendedPlan?: string;

//   recommendedTool?: string;

//   savings: number;

//   reason: string;
// }




export default function AuditResults({ result }: {result:AuditResult}) {
  const totalMonthlySavings = result.monthlySavings;
  const totalAnnualSavings = result.annualSavings;
  const efficiencyScore = result.score;

  const toolBreakdown = [
    {
      tool: "Cursor Business",
      currentSpend: 400,
      savings: 120,
      action: "Reduce seats from 10 → 7",
      reason:
        "3 seats appear underutilized based on team size and spend profile.",
    },
    {
      tool: "ChatGPT Team",
      currentSpend: 375,
      savings: 240,
      action: "Consolidate research workflows",
      reason:
        "Research usage overlaps significantly with Claude and internal tooling.",
    },
    {
      tool: "Claude Team",
      currentSpend: 180,
      savings: 280,
      action: "Downgrade unused seats",
      reason:
        "Several paid seats show low estimated utilization.",
    },
  ];

  const currentSpend = toolBreakdown.reduce(
    (sum, tool) => sum + tool.currentSpend,
    0,
  );

  const recommendedSpend =
    currentSpend - totalMonthlySavings;

  const showCredex =
    totalMonthlySavings >= 500;

  const optimized =
    totalMonthlySavings < 100 ||
    efficiencyScore >= 90;

  return (
    <div className="mx-auto max-w-7xl  py-10">

      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative overflow-hidden
          rounded-3xl
          border border-red-500/10
          bg-zinc-950
          p-8 md:p-12
        "
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="text-red-500 text-sm font-medium uppercase tracking-wider">
            Audit Complete
          </div>

          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-white">
            ${totalMonthlySavings}
            <span className="text-zinc-400 text-2xl md:text-3xl">
              /month
            </span>
          </h1>

          <p className="mt-2 text-zinc-400">
            Potential savings identified
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="text-zinc-500 text-sm">
                Annual Impact
              </div>

              <div className="mt-2 text-3xl font-bold text-white">
                ${totalAnnualSavings}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="text-zinc-500 text-sm">
                Efficiency Score
              </div>

              <div className="mt-2 text-3xl font-bold text-white">
                {efficiencyScore}/100
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="text-zinc-500 text-sm">
                Opportunities
              </div>

              <div className="mt-2 text-3xl font-bold text-white">
                {toolBreakdown.length}
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* PERSONALIZED SUMMARY */}

      <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <h2 className="text-xl font-semibold text-white">
          Personalized Summary
        </h2>

        <p className="mt-4 leading-8 text-zinc-300">
          Your team currently spends{" "}
          <span className="text-white font-medium">
            ${currentSpend}/month
          </span>{" "}
          across AI tooling.

          Most of your spend is concentrated in
          Cursor Business and ChatGPT Team.

          Compared to similar engineering teams,
          your cost per seat is estimated to be
          above average.

          The largest opportunities come from
          removing underutilized seats and
          consolidating overlapping workflows.

          Estimated savings:
          <span className="text-red-400 font-medium">
            {" "}
            ${totalMonthlySavings}/month
          </span>
          {" "}(
          ${totalAnnualSavings}/year).
        </p>
      </div>

      {/* SAVINGS SNAPSHOT */}

      <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

        <div className="flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-semibold text-white">
            Savings Snapshot
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">

          <div>
            <div className="text-zinc-500 text-sm">
              Current Spend
            </div>

            <div className="mt-2 text-2xl font-bold text-white">
              ${currentSpend}
            </div>
          </div>

          <div>
            <div className="text-zinc-500 text-sm">
              Recommended Spend
            </div>

            <div className="mt-2 text-2xl font-bold text-white">
              ${recommendedSpend}
            </div>
          </div>

          <div>
            <div className="text-zinc-500 text-sm">
              Monthly Savings
            </div>

            <div className="mt-2 text-2xl font-bold text-green-400">
              ${totalMonthlySavings}
            </div>
          </div>

          <div>
            <div className="text-zinc-500 text-sm">
              Annual Savings
            </div>

            <div className="mt-2 text-2xl font-bold text-green-400">
              ${totalAnnualSavings}
            </div>
          </div>

        </div>
      </div>

      {/* TOOL BREAKDOWN */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold text-white">
          Tool Breakdown
        </h2>

        <div className="mt-6 space-y-5">

          {toolBreakdown.map((tool) => (
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

                  <div className="mt-1 text-zinc-500">
                    Current Spend: $
                    {tool.currentSpend}/mo
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-green-400 font-bold text-xl">
                    ${tool.savings}/mo
                  </div>

                  <div className="text-zinc-500 text-sm">
                    Potential Savings
                  </div>
                </div>

              </div>

              <div className="mt-5 rounded-2xl bg-zinc-900/50 p-4">
                <div className="text-zinc-400 text-sm">
                  Recommended Action
                </div>

                <div className="mt-2 text-white font-medium">
                  {tool.action}
                </div>
              </div>

              <p className="mt-4 text-zinc-400">
                {tool.reason}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* CREDEx */}

      {showCredex && (
        <div
          className="
            mt-8
            rounded-3xl
            border border-red-500/20
            bg-red-500/4
            p-8
          "
        >
          <Sparkles className="h-6 w-6 text-red-500" />

          <h2 className="mt-4 text-3xl font-bold text-white">
            You're leaving
            {" "}
            ${totalMonthlySavings}/month
            {" "}
            on the table.
          </h2>

          <p className="mt-4 max-w-3xl text-zinc-300">
            Credex can help your team capture
            these savings and continuously
            monitor AI spend as your stack
            evolves.
          </p>

          <button
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-red-600
              px-6
              py-3
              font-medium
              text-white
            "
          >
            Explore Credex
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* OPTIMIZED STATE */}

      {optimized && (
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

          <h2 className="text-2xl font-bold text-white">
            You're Spending Well
          </h2>

          <p className="mt-4 text-zinc-300">
            We found very few optimization
            opportunities. Your AI tooling
            configuration appears efficient
            compared to similar teams.
          </p>

          <div className="mt-6 flex flex-col gap-3 md:flex-row">

            <input
              placeholder="Work email"
              className="
                flex-1 rounded-2xl
                border border-zinc-700
                bg-zinc-900
                px-4 py-3
                text-white
              "
            />

            <button
              className="
                rounded-2xl
                bg-white
                px-6 py-3
                text-black
                font-medium
              "
            >
              Notify Me
            </button>

          </div>
        </div>
      )}

      {/* CTA */}

      <div className="mt-10 flex flex-wrap gap-4">

        <button
          className="
            rounded-2xl
            border border-zinc-700
            px-6 py-3
            text-white
          "
        >
          Export PDF
        </button>

        <Link
          href={"/audit/12"}
          className="
            rounded-2xl
            border border-zinc-700
            px-6 py-3
            text-white
          "
        >
          Share Audit
        </Link>

        <button
          className="
            rounded-2xl
            bg-white
            px-6 py-3
            font-medium
            text-black
          "
        >
          Run Another Audit
        </button>

      </div>

    </div>
  );
}