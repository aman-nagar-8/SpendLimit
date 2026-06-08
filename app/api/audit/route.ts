import { NextRequest, NextResponse } from "next/server";
import { runAudit , AuditResult } from "@/auditEngine/auditEngineV1";
import {capabilityRatings ,useCaseBenchmarks } from "@/auditEngine/dataV1" 
import { PRICING_DATA } from "@/auditEngine/pricingData";

export async function POST(req: NextRequest) {
  const { tools, plans, useCase, monthlySpending, numberOfSeats, teamSize } =
    await req.json();

    const auditResult:AuditResult = runAudit({teamSize , useCase , tools , capabilityRatings , pricingData:PRICING_DATA , useCaseBenchmarks});
}
