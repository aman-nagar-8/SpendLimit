"use client";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

type Props = {
  curr: number;
  setAuditState: any;
};

const auditSteps = [
  {
    title: "Collecting subscription data",
    detail: "Found 10 active seats across Cursor Business",
  },
  {
    title: "Analyzing spend patterns",
    detail: "Processing $400 monthly AI expenditure",
  },
  {
    title: "Calculating cost per seat",
    detail: "Current average cost: $40.00 per seat",
  },
  {
    title: "Benchmarking against peers",
    detail: "Comparing with 1,247 engineering teams",
  },
  {
    title: "Detecting redundant tooling",
    detail: "Checking overlap across AI workflows",
  },
  {
    title: "Generating optimization report",
    detail: "Preparing recommendations and savings estimates",
  },
];

export function AuditLoading({ curr, setAuditState }: Props) {
  const [currentStep, setCurrentStep] = useState(curr);
  const progress = ((currentStep + 1) / auditSteps.length) * 100;

useEffect(() => {
  if (currentStep >= auditSteps.length - 1) {
    const timeout = setTimeout(() => {
      setAuditState("results");
    }, 1000);

    return () => clearTimeout(timeout);
  }

  const timeout = setTimeout(() => {
    setCurrentStep((prev) => prev + 1);
  }, 1200);

  return () => clearTimeout(timeout);
}, [currentStep, setAuditState]);

  return (
    <div className="mt-10 max-w-5xl mx-aut">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-xl p-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Running AI Spend Audit
            </h3>

            <p className="mt-1 text-zinc-400">
              Evaluating costs, utilization, and optimization opportunities
            </p>
          </div>

          <div className="text-right">
            <div className="text-red-500 font-semibold">
              {Math.round(progress)}%
            </div>

            <div className="text-xs text-zinc-500">Analysis Progress</div>
          </div>
        </div>

        {/* Progress Bar */}

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            className="h-full rounded-full bg-red-500"
            initial={{ width: 0 }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.8,
            }}
          />
        </div>

        {/* Steps */}

        <div className="mt-8 space-y-5">
          {auditSteps.map((step, index) => {
            const completed = index < currentStep;

            const active = index === currentStep;

            return (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                  flex items-start gap-4
                "
              >
                {/* Status Icon */}

                <div
                  className="
                    mt-1 flex h-8 w-8
                    items-center justify-center
                    rounded-full
                    border
                  "
                >
                  {completed ? (
                    <Check size={16} className="text-green-400" />
                  ) : active ? (
                    <Loader2
                      size={16}
                      className="
                        animate-spin
                        text-red-500
                      "
                    />
                  ) : (
                    <div
                      className="
                        h-2 w-2 rounded-full
                        bg-zinc-600
                      "
                    />
                  )}
                </div>

                {/* Text */}

                <div className="flex-1">
                  <div
                    className={`
                      font-medium
                      ${
                        completed
                          ? "text-white"
                          : active
                            ? "text-white"
                            : "text-zinc-500"
                      }
                    `}
                  >
                    {step.title}
                  </div>

                  <div
                    className={`
                      mt-1 text-sm
                      ${active ? "text-zinc-300" : "text-zinc-500"}
                    `}
                  >
                    {step.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
