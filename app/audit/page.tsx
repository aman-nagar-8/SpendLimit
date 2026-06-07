"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { AI_TOOLS, USE_CASE } from "../data";
import { useState, useEffect } from "react";
import { CustomSelect } from "@/components/SelectedTool";
import { motion } from "framer-motion";
import { AuditLoading } from "@/components/AuditLoading";
import AuditResults from "@/components/AuditResult";
import { TrackButton } from "@/components/TrackButton";

type AuditState = "form" | "analyzing" | "results";

const page = () => {
  const [selectedTool, setSelectedTool] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [primaryUseCase, setPrimaryUseCase] = useState("");
  const [formInfo, setFormInfo] = useState({
    monthlySpending: "",
    numberOfSeats: "",
    teamSize: "",
  });

  const [auditState, setAuditState] = useState<AuditState>("form");

  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit() {
    // print all the form info in console
    console.log("Selected Tool: ", selectedTool);
    console.log("Selected Plan: ", selectedPlan);
    console.log("Primary Use Case: ", primaryUseCase);
    console.log("Monthly Spending: ", formInfo.monthlySpending);
    console.log("Number of Seats: ", formInfo.numberOfSeats);
    console.log("Team Size: ", formInfo.teamSize);
    setIsSubmitted(true);
    setAuditState("analyzing");
  }

  function stopTracking() {
    setIsSubmitted(true);
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-x-hidden">
      {/* Navbar */}
      <Navbar />
      {/* Heading */}
      <main className=" px-5 md:px-15">
        {/* Input form */}
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-red-500/10 bg-zinc-950/80 backdrop-blur-xl p-6 md:p-8">
            {/* Glow Effects */}
            <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-red-500/5 blur-3xl" />

            {!isSubmitted && (
              <div className="relative z-10">
                <div className="py-1 pl-2 md:pl-3 mt-3 border-l-3 border-red-500">
                  <div className="text-lg text-white md:text-2xl font-bold">
                    Track Your AI Spend
                  </div>
                  <div className="text-gray-400 text-sm">
                    See where your AI budget goes and identify savings
                    opportunities.
                  </div>
                </div>
                {/* Section 01 */}
                <div className="mt-10 flex items-center gap-3">
                  <span className="font-mono text-red-500">01</span>
                  <span className="text-white font-medium">Tool Selection</span>
                </div>

                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {/* Tool */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      AI Tool
                    </label>

                    <CustomSelect
                      value={selectedTool}
                      onChange={setSelectedTool}
                      placeholder="Select AI Tool"
                      options={AI_TOOLS.map((tool) => ({
                        label: tool.name,
                        value: tool.id,
                      }))}
                    />
                  </div>

                  {/* Plan */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Plan
                    </label>

                    <CustomSelect
                      value={selectedPlan}
                      onChange={setSelectedPlan}
                      placeholder="Select Plan"
                      options={
                        AI_TOOLS.find(
                          (tool) => tool.id === selectedTool,
                        )?.plans.map((plan) => ({
                          label: plan,
                          value: plan,
                        })) || []
                      }
                    />
                  </div>
                </div>

                {/* Section 02 */}
                <div className="mt-10 flex items-center gap-3">
                  <span className="font-mono text-red-500">02</span>
                  <span className="text-white font-medium">Usage Details</span>
                </div>

                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {/* Use Case */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Primary Use Case
                    </label>

                    <CustomSelect
                      value={primaryUseCase}
                      onChange={setPrimaryUseCase}
                      placeholder="Select Use Case"
                      options={USE_CASE}
                    />
                  </div>

                  {/* Spend */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Monthly Spend
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                        $
                      </span>

                      <input
                        type="number"
                        placeholder="0"
                        value={formInfo.monthlySpending}
                        onChange={(e) =>
                          setFormInfo({
                            ...formInfo,
                            monthlySpending: e.target.value,
                          })
                        }
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 py-4 pl-8 pr-4 text-white outline-none transition-all duration-300 focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 03 */}
                <div className="mt-10 flex items-center gap-3">
                  <span className="font-mono text-red-500">03</span>
                  <span className="text-white font-medium">
                    Team Information
                  </span>
                </div>

                <div className="mt-4 grid gap-6 md:grid-cols-2">
                  {/* Seats */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Number of Seats
                    </label>

                    <input
                      type="number"
                      placeholder="10"
                      value={formInfo.numberOfSeats}
                      onChange={(e) =>
                        setFormInfo({
                          ...formInfo,
                          numberOfSeats: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-4 text-white outline-none transition-all duration-300 focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10"
                    />
                  </div>

                  {/* Team Size */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">
                      Team Size
                    </label>

                    <input
                      type="number"
                      placeholder="25"
                      value={formInfo.teamSize}
                      onChange={(e) =>
                        setFormInfo({
                          ...formInfo,
                          teamSize: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-4 text-white outline-none transition-all duration-300 focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10"
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <div className="mt-8 rounded-2xl border border-red-500/10 bg-red-500/5 p-5">
                  <div className="text-sm text-zinc-400">Current Selection</div>

                  <div className="mt-2 text-white font-medium">
                    {selectedTool
                      ? AI_TOOLS.find((t) => t.id === selectedTool)?.name
                      : "No tool selected"}
                  </div>

                  <div className="mt-1 text-zinc-400">
                    {selectedPlan || "No plan"} • {formInfo.numberOfSeats || 0}{" "}
                    seats • ${formInfo.monthlySpending || 0}/month
                  </div>
                </div>

                {/* Button */}
                <TrackButton fn={handleSubmit} text={"Track AI Spend"} />
              </div>
            )}
            {isSubmitted && (
              <div className="relative z-10">
                <div className="py-1 pl-2 md:pl-3 mt-3 border-l-3 border-red-500">
                  <div className="text-lg text-white md:text-2xl font-bold">
                    Track Your AI Spend
                  </div>
                  <div className="text-gray-400 text-sm">
                    See where your AI budget goes and identify savings
                    opportunities.
                  </div>
                </div>
                {/* Summary Card */}
                <motion.div
                  initial={{
                    opacity: 0.5,
                    y: 500,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1], // smooth premium easing
                  }}
                  className="mt-8 rounded-2xl border border-red-500/10 bg-red-500/5 p-5"
                >
                  <div className="text-sm text-zinc-400">Current Selection</div>

                  <div className="mt-2 text-white font-medium">
                    {selectedTool
                      ? AI_TOOLS.find((t) => t.id === selectedTool)?.name
                      : "No tool selected"}
                  </div>

                  <div className="mt-1 text-zinc-400">
                    {selectedPlan || "No plan"} • {formInfo.numberOfSeats || 0}{" "}
                    seats • ${formInfo.monthlySpending || 0}/month
                  </div>
                </motion.div>
                {auditState === "analyzing" && (
                  <>
                    <AuditLoading curr={0} setAuditState={setAuditState} />
                    {/* Button */}
                    <TrackButton fn={stopTracking} text={"Stop Tracking"} />
                  </>
                )}
                {auditState === "results" && <AuditResults />}
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="h-100" ></footer>
    </div>
  );
};



export default page;
