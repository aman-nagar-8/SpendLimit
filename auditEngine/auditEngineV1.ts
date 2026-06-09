// audit-engine.ts
import {capabilityRatings} from "./dataV1" 
// import { PricingData } from "./pricingData";

export type UseCase =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed";

export interface ToolInput {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface PlanData {
  price: number;
  seatLimit?: number;
  tokenLimit?: number;
  supportsTeams?: boolean;
  supportsSSO?: boolean;
  supportsCompliance?: boolean;
}

export interface PricingData {
  [toolName: string]: {
    [planName: string]: PlanData;
  };
}

export interface UseCaseBenchmark {
  useCase: UseCase;
  minCostPerEmployee: number;
  targetCostPerEmployee:number;
  maxCostPerEmployee: number;
}

export interface CapabilityRatings {
  [useCase: string]: {
    [toolName: string]: number;
  };
}

export interface AuditInput {
  teamSize: number;
  useCase: UseCase;
  tools: ToolInput[];

  pricingData: PricingData;
  useCaseBenchmarks: UseCaseBenchmark[];
  capabilityRatings: CapabilityRatings;
}

export interface Recommendation {
  tool: string;

  currentSpend: number;

  recommendationType:
    | "downgrade"
    | "alternative"
    | "api_replacement"
    | "keep";

  currentPlan: string;

  recommendedPlan?: string;

  recommendedTool?: string;

  savings: number;

  reason: string;
}

export interface AuditResult {
  monthlySavings: number;
  annualSavings: number;
  score:number;
  industryAvg:number;

  spendPerEmployee: number;


  benchmarkStatus:
    | "under"
    | "within"
    | "over";

  status:
    | "credex_opportunity"
    | "optimization_found"
    | "already_optimized";

  recommendations: Recommendation[];
}

const CAPABILITY_THRESHOLD = 0.5;
const SAVINGS_THRESHOLD_PERCENT = 20;

function calculateSpendPerEmployee(
  teamSize: number,
  tools: ToolInput[]
) {
  const totalSpend = tools.reduce(
    (sum, tool) => sum + tool.monthlySpend,
    0
  );

  return totalSpend / Math.max(teamSize, 1);
}

function getBenchmarkStatus(
  spendPerEmployee: number,
  benchmark: UseCaseBenchmark
) {
  if (
    spendPerEmployee <
    benchmark.minCostPerEmployee
  ) {
    return "under";
  }

  if (
    spendPerEmployee >
    benchmark.maxCostPerEmployee
  ) {
    return "over";
  }

  return "within";
}

function getAuditStatus(
  monthlySavings: number
) {
  if (monthlySavings > 500) {
    return "credex_opportunity";
  }

  if (monthlySavings < 100) {
    return "already_optimized";
  }

  return "optimization_found";
}

function findCheaperVendorPlan(
  toolName: string,
  currentPlan: string,
  seats: number,
  pricingData: PricingData
) {
  const toolPricing =
    pricingData[toolName];

  if (!toolPricing) return null;

  const current =
    toolPricing[currentPlan];

  if (!current) return null;

  let bestPlan: string | null = null;
  let bestPrice = current.price;

  Object.entries(toolPricing).forEach(
    ([planName, plan]) => {
      const seatValid =
        !plan.seatLimit ||
        seats <= plan.seatLimit;

      if (
        seatValid &&
        plan.price < bestPrice
      ) {
        bestPrice = plan.price;
        bestPlan = planName;
      }
    }
  );

  return bestPlan;
}

function findAlternativeTool(
  toolName: string,
  currentPlan: string,
  useCase: UseCase,
  seats: number,
  pricingData: PricingData,
  capabilityRatings: CapabilityRatings
): { tool: string; plan: string; savings: number } | null {
  const ratings =
    capabilityRatings[useCase];

  if (!ratings) return null;

  const currentScore =
    ratings[toolName];

  const currentPlanData =
    pricingData[toolName]?.[
      currentPlan
    ];

  if (
    currentScore === undefined ||
    !currentPlanData
  ) {
    return null;
  }

  let bestAlternative = null;

  Object.entries(ratings).forEach(
    ([alternativeTool, score]) => {
      if (
        alternativeTool === toolName
      )
        return;

      const scoreGap =
        currentScore - score;

      if (
        scoreGap >
        CAPABILITY_THRESHOLD
      ) {
        return;
      }

      const altPlans =
        pricingData[
          alternativeTool
        ];

      if (!altPlans) return;

      const cheapestPlan =
        Object.entries(
          altPlans
        ).sort(
          (a, b) =>
            a[1].price -
            b[1].price
        )[0];

      if (!cheapestPlan) return;

      const [
        planName,
        planData
      ] = cheapestPlan;

      const currentCost =
        currentPlanData.price *
        seats;

      const altCost =
        planData.price * seats;

      const savings =
        currentCost - altCost;

      const savingsPercent =
        (savings /
          currentCost) *
        100;

      if (
        savingsPercent >=
        SAVINGS_THRESHOLD_PERCENT
      ) {
        bestAlternative = {
          tool: alternativeTool,
          plan: planName,
          savings
        };
      }
    }
  );

  return bestAlternative;
}

function checkApiReplacement(
  toolName: string,
  currentSpend: number,
  seats: number
) {
  const supported =
    [
      "chatgpt",
      "claude",
      "openai",
      "anthropic"
    ].includes(
      toolName.toLowerCase()
    );

  if (!supported) return null;

  const estimatedApiCost =
    currentSpend * 0.4;

  const savings =
    currentSpend -
    estimatedApiCost;

  if (savings <= 0) return null;

  return {
    estimatedApiCost,
    savings
  };
}

function calculateAuditScore({
  spendPerEmployee,
  benchmark,
  tools,
  recommendations,
}: {
  spendPerEmployee: number;
  benchmark: UseCaseBenchmark;
  tools: ToolInput[];
  recommendations: Recommendation[];
}) {
  let score = 100;

  // Overspend penalty
  const overspend =
    spendPerEmployee -
    benchmark.maxCostPerEmployee;

  if (overspend > 0) {
    score -= overspend * 0.8;
  }

  // Team plan overkill
  for (const tool of tools) {
    const plan = tool.plan.toLowerCase();

    const isTeamPlan =
      plan.includes("team") ||
      plan.includes("business") ||
      plan.includes("enterprise");

    if (tool.seats <= 2 && isTeamPlan) {
      score -= 8;
    }

    if (
      tool.seats <= 10 &&
      plan.includes("enterprise")
    ) {
      score -= 12;
    }
  }

  // Duplicate AI tools
  const duplicateThreshold = 3;

  if (tools.length > duplicateThreshold) {
    score -=
      (tools.length -
        duplicateThreshold) *
      5;
  }

  // Savings opportunity
  const totalSpend = tools.reduce(
    (sum, tool) =>
      sum + tool.monthlySpend,
    0
  );

  const totalSavings =
    recommendations.reduce(
      (sum, rec) =>
        sum + rec.savings,
      0
    );

  const savingsPercent =
    totalSpend > 0
      ? (totalSavings /
          totalSpend) *
        100
      : 0;

  if (savingsPercent >= 30) {
    score -= 15;
  }

  score = Math.max(
    0,
    Math.min(100, Math.round(score))
  );

  let scoreLabel =
    "Elite Optimization";

  if (score < 50) {
    scoreLabel =
      "Severely Inefficient";
  } else if (score < 70) {
    scoreLabel =
      "Significant Overspend";
  } else if (score < 85) {
    scoreLabel =
      "Some Waste Detected";
  } else if (score < 95) {
    scoreLabel =
      "Well Optimized";
  }

  return {
    score,
    scoreLabel,
  };
}

export function runAudit(
  input: AuditInput
): AuditResult {
  const {
    teamSize,
    useCase,
    tools,
    pricingData,
    capabilityRatings,
    useCaseBenchmarks
  } = input;

  const recommendations: Recommendation[] =
    [];

  const spendPerEmployee =
    calculateSpendPerEmployee(
      teamSize,
      tools
    );

  const benchmark =
    useCaseBenchmarks.find(
      (b) =>
        b.useCase === useCase
    );

  const benchmarkStatus =
    benchmark
      ? getBenchmarkStatus(
          spendPerEmployee,
          benchmark
        )
      : "within";

  for (const tool of tools) {
    const {
      tool: toolName,
      plan,
      monthlySpend,
      seats
    } = tool;

    const downgradePlan =
      findCheaperVendorPlan(
        toolName,
        plan,
        seats,
        pricingData
      );

    if (
      downgradePlan &&
      downgradePlan !== plan
    ) {
      const currentPrice =
        pricingData[
          toolName
        ][plan].price;

      const newPrice =
        pricingData[
          toolName
        ][downgradePlan]
          .price;

      const savings =
        (currentPrice -
          newPrice) *
        seats;

      recommendations.push({
        tool: toolName,
        currentSpend:
          monthlySpend,
        recommendationType:
          "downgrade",
        currentPlan: plan,
        recommendedPlan:
          downgradePlan,
        savings,
        reason: `Current seat count (${seats}) does not justify ${plan}. ${downgradePlan} provides similar functionality at lower cost.`
      });
    }

    const alternative =
      findAlternativeTool(
        toolName,
        plan,
        useCase,
        seats,
        pricingData,
        capabilityRatings
      );

    if (alternative) {
      recommendations.push({
        tool: toolName,
        currentSpend:
          monthlySpend,
        recommendationType:
          "alternative",
        currentPlan: plan,
        recommendedTool:
          alternative.tool,
        recommendedPlan:
          alternative.plan,
        savings:
          alternative.savings,
        reason: `${alternative.tool} delivers similar capability for ${useCase} while reducing cost significantly.`
      });
    }

    const apiReplacement =
      checkApiReplacement(
        toolName,
        monthlySpend,
        seats
      );

    if (apiReplacement) {
      recommendations.push({
        tool: toolName,
        currentSpend:
          monthlySpend,
        recommendationType:
          "api_replacement",
        currentPlan: plan,
        savings:
          apiReplacement.savings,
        reason:
          "Estimated API usage cost is substantially lower than subscription spend."
      });
    }
  }

  const monthlySavings =
    recommendations.reduce(
      (sum, r) =>
        sum + r.savings,
      0
    );
    const scoreData =
  benchmark
    ? calculateAuditScore({
        spendPerEmployee,
        benchmark,
        tools,
        recommendations,
      })
    : {
        score: 100,
        scoreLabel:
          "Well Optimized",
      };

  return {
    monthlySavings,
    score:scoreData.score,
    industryAvg:
    benchmark
      ?.targetCostPerEmployee ??
    0,


    annualSavings:
      monthlySavings * 12,

    spendPerEmployee,

    benchmarkStatus,

    status:
      getAuditStatus(
        monthlySavings
      ),

    recommendations
  };
}