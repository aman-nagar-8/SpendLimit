/**
 * PRICING_DATA.ts
 * All prices are USD/month per seat unless noted.
 * Sources:
 *   Cursor:          https://cursor.com/pricing
 *   GitHub Copilot:  https://github.com/features/copilot#pricing
 *   Claude:          https://claude.ai/pricing  |  https://www.anthropic.com/pricing
 *   ChatGPT:         https://openai.com/pricing
 *   Anthropic API:   https://www.anthropic.com/pricing#anthropic-api
 *   OpenAI API:      https://platform.openai.com/docs/pricing
 *   Gemini:          https://one.google.com/about/google-ai-plans/
 *   Windsurf:        https://windsurf.com/pricing
 *
 * Last verified: June 2026
 */

export interface PlanData {
  price: number;             // USD / month (per seat where applicable)
  seatLimit?: number;        // max seats; undefined = unlimited
  tokenLimit?: number;       // monthly token budget in millions; undefined = unlimited or N/A
  supportsTeams?: boolean;   // has team/org management features
  supportsSSO?: boolean;     // SAML / OIDC SSO
  supportsCompliance?: boolean; // audit logs, data retention, HIPAA/SOC2 controls
  notes?: string;
}

export interface PricingData {
  [toolName: string]: {
    [planName: string]: PlanData;
  };
}

// ─────────────────────────────────────────────
// Individual tool objects
// ─────────────────────────────────────────────

export const cursorPricing: PricingData["cursor"] = {
  hobby: {
    price: 0,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Limited agent & tab completions. No credit card required.",
  },
  pro: {
    price: 20,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Unlimited tab completions, $20 credit pool/mo, frontier models, MCP support.",
  },
  pro_plus: {
    price: 60,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "3× usage credits vs Pro. Same feature set.",
  },
  ultra: {
    price: 200,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "20× Pro usage credits. Priority feature access.",
  },
  business: {
    price: 40,          // per seat / month
    supportsTeams: true,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Pro features + admin controls, centralized billing, shared .cursorrules.",
  },
  enterprise: {
    price: 0,           // custom — contact sales
    supportsTeams: true,
    supportsSSO: true,
    supportsCompliance: true,
    notes: "Pooled credits, SCIM provisioning, audit logs, volume discounts. Price: custom.",
  },
};

export const githubCopilotPricing: PricingData["github_copilot"] = {
  free: {
    price: 0,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Limited completions & chat. Available to all GitHub users.",
  },
  individual: {
    price: 10,          // $100/yr = ~$8.33/mo; listed monthly = $10
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Unlimited completions + chat across all major IDEs. $100/yr if billed annually.",
  },
  pro_plus: {
    price: 39,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Full model lineup incl. Claude Opus 4.6, o3. 1,500 premium requests/mo.",
  },
  business: {
    price: 19,          // per seat / month
    supportsTeams: true,
    supportsSSO: true,
    supportsCompliance: true,
    notes: "Org controls, SAML SSO, audit logs, IP indemnity. Requires GitHub org.",
  },
  enterprise: {
    price: 39,          // per seat / month
    supportsTeams: true,
    supportsSSO: true,
    supportsCompliance: true,
    notes: "Fine-tuning on private codebase, knowledge bases, GitHub Enterprise Cloud.",
  },
};

export const claudePricing: PricingData["claude"] = {
  free: {
    price: 0,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Web, iOS, Android. Limited daily usage. Code, web search, image analysis.",
  },
  pro: {
    price: 20,          // $17/mo if billed annually
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "5× free usage. Claude Code, Projects, Research, MCP, Google Workspace. $17/mo annual.",
  },
  max_5x: {
    price: 100,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "5× Pro usage limits. Early feature access. Priority at peak times.",
  },
  max_20x: {
    price: 200,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "20× Pro usage limits. Highest throughput priority.",
  },
  team: {
    price: 30,          // $25/mo if billed annually; per seat
    supportsTeams: true,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Pro features + centralized billing, admin console. Min 5 members. $25/mo annual.",
  },
  enterprise: {
    price: 0,           // custom
    supportsTeams: true,
    supportsSSO: true,
    supportsCompliance: true,
    notes: "SSO/SCIM, audit logs, enhanced context windows, RBAC, compliance API. Custom pricing.",
  },
};

export const claudeApiPricing: PricingData["anthropic_api"] = {
  haiku_4_5: {
    price: 0,           // pay-per-token; $0.80 input / $4 output per 1M tokens
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "$0.80/1M input tokens, $4/1M output tokens. Fast, lightweight tasks.",
  },
  sonnet_4_6: {
    price: 0,           // $3 input / $15 output per 1M tokens
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "$3/1M input tokens, $15/1M output tokens. Best balance of speed & capability.",
  },
  opus_4_6: {
    price: 0,           // $15 input / $75 output per 1M tokens
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "$15/1M input tokens, $75/1M output tokens. Most capable Anthropic model.",
  },
  opus_4_6_fast: {
    price: 0,           // $30 input / $150 output per 1M tokens
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "$30/1M input tokens, $150/1M output tokens. Opus with lower latency.",
  },
};

export const chatgptPricing: PricingData["chatgpt"] = {
  free: {
    price: 0,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "GPT-5.3 with rate limits. Includes ads (US, Feb 2026+).",
  },
  go: {
    price: 8,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "More usage than Free. Ad-supported. Launched globally Jan 2026.",
  },
  plus: {
    price: 20,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "GPT-5.5, Deep Research (10/mo), Sora, Codex, Agent Mode. No ads.",
  },
  pro_100: {
    price: 100,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "5× Plus usage. GPT-5.5 Pro mode. Launched Apr 9, 2026.",
  },
  pro_200: {
    price: 200,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "20× Plus usage. 1M token context, o1 Pro mode.",
  },
  business: {
    price: 20,          // was $25; reduced Apr 2026. Per seat.
    supportsTeams: true,
    supportsSSO: true,
    supportsCompliance: true,
    notes: "SSO, admin controls, SOC 2, no training on data. Min 2 users. $25/mo billed monthly.",
  },
  enterprise: {
    price: 0,           // custom
    supportsTeams: true,
    supportsSSO: true,
    supportsCompliance: true,
    notes: "SCIM, EKM, audit logs, custom data retention, RBAC. Annual contract.",
  },
};

export const openaiApiPricing: PricingData["openai_api"] = {
  gpt_4_1_mini: {
    price: 0,           // $0.40 input / $1.60 output per 1M tokens
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "$0.40/1M input tokens, $1.60/1M output tokens. Best for high-volume tasks.",
  },
  gpt_4_1: {
    price: 0,           // $2 input / $8 output per 1M tokens
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "$2/1M input tokens, $8/1M output tokens. Strong all-round model.",
  },
  gpt_5_5: {
    price: 0,           // $5 input / $30 output per 1M tokens
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "$5/1M input tokens, $30/1M output tokens. Latest flagship model.",
  },
};

export const geminiPricing: PricingData["gemini"] = {
  free: {
    price: 0,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Gemini 3.5 Flash with daily limits. Available in Gemini app.",
  },
  ai_plus: {
    price: 7.99,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Light users. Affordable Google storage (100GB) + basic Gemini access.",
  },
  ai_pro: {
    price: 19.99,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Full Gemini 3.1 Pro, 2TB storage, YouTube Premium Lite, Jules coding agent, $10/mo Google Cloud credit.",
  },
  ai_ultra_100: {
    price: 100,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Announced Google I/O 2026. 5× AI Pro limits. Gemini Spark. 20TB storage.",
  },
  ai_ultra_200: {
    price: 200,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Previously $250; reduced 2026. 20× AI Pro limits. Veo 3.1 video gen, Project Mariner agentic browsing. 20TB+ storage.",
  },
  workspace: {
    price: 14,          // per seat / month — Business Starter base; add-on varies
    supportsTeams: true,
    supportsSSO: true,
    supportsCompliance: true,
    notes: "Gemini AI built into Gmail, Drive, Docs, Sheets. Business Starter onwards. Price varies by Workspace tier.",
  },
};

export const geminiApiPricing: PricingData["gemini_api"] = {
  flash_2_5: {
    price: 0,           // Free tier available; paid: $0.15 input / $0.60 output per 1M tokens
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Free tier in AI Studio. Paid: $0.15/$0.60 per 1M tokens. Best price/performance.",
  },
  pro_2_5: {
    price: 0,           // $1.25 input / $10 output per 1M tokens (>200k ctx: $2.50/$15)
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "$1.25/1M input tokens, $10/1M output tokens. 1M context window.",
  },
  ultra_2_0: {
    price: 0,           // Vertex AI only; custom pricing
    tokenLimit: undefined,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Via Google Vertex AI only. Enterprise pricing. See cloud.google.com/vertex-ai/pricing.",
  },
};

export const windsurfPricing: PricingData["windsurf"] = {
  free: {
    price: 0,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Daily/weekly quota. Unlimited Tab autocomplete. Full Cascade on limited basis.",
  },
  pro: {
    price: 20,          // ~$16/mo billed annually
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Daily/weekly quota refresh. Full Cascade, all frontier models. $16/mo if annual.",
  },
  max: {
    price: 200,
    supportsTeams: false,
    supportsSSO: false,
    supportsCompliance: false,
    notes: "Maximum quota. SWE-1.5 access. Power-user tier.",
  },
  teams: {
    price: 40,          // per seat / month
    seatLimit: 200,
    supportsTeams: true,
    supportsSSO: true,
    supportsCompliance: false,
    notes: "SSO, admin analytics, centralized billing. Up to 200 users.",
  },
  enterprise: {
    price: 0,           // ~$60/seat/mo starting; custom
    supportsTeams: true,
    supportsSSO: true,
    supportsCompliance: true,
    notes: "~$60/seat/mo starting. Volume discounts above 200 seats. Custom contract.",
  },
};

// ─────────────────────────────────────────────
// Flat master object — all tools merged
// ─────────────────────────────────────────────

export const PRICING_DATA: PricingData = {
  cursor: cursorPricing,
  github_copilot: githubCopilotPricing,
  claude: claudePricing,
  anthropic_api: claudeApiPricing,
  chatgpt: chatgptPricing,
  openai_api: openaiApiPricing,
  gemini: geminiPricing,
  gemini_api: geminiApiPricing,
  windsurf: windsurfPricing,
};

export default PRICING_DATA;

// ─────────────────────────────────────────────
// Helper: list all plans for a tool
// ─────────────────────────────────────────────

export function getPlans(toolName: keyof typeof PRICING_DATA) {
  return Object.entries(PRICING_DATA[toolName]).map(([plan, data]) => ({
    tool: toolName,
    plan,
    ...data,
  }));
}

// ─────────────────────────────────────────────
// Helper: cheapest paid plan for a tool
// ─────────────────────────────────────────────

export function cheapestPaidPlan(toolName: keyof typeof PRICING_DATA) {
  return getPlans(toolName)
    .filter((p) => p.price > 0)
    .sort((a, b) => a.price - b.price)[0];
}