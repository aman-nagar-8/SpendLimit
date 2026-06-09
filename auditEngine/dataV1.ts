export interface CapabilityRatings {
  [useCase: string]: {
    [toolName: string]: number;
  };
}

import { UseCaseBenchmark } from "./auditEngineV1";

export const capabilityRatings: CapabilityRatings = {
  coding: {
    "Cursor Pro": 9.8,
    "Cursor Business": 9.7,
    "OpenAI API Direct": 9.6,
    "Cursor Enterprise": 9.5,
    "Windsurf Pro": 9.4,
    "GitHub Copilot Enterprise": 9.2,
    "ChatGPT Team": 9.1,
    "ChatGPT Enterprise": 9.1,
    "GitHub Copilot Business": 8.9,
    "Gemini API": 8.8,
    "ChatGPT Plus": 8.8,
    "v0": 8.7,
    "Gemini Ultra": 8.5,
    "GitHub Copilot Individual": 8.4,
    "Cursor Hobby": 8.3,
  },

  research: {
    "Claude Enterprise": 9.9,
    "Claude Team": 9.8,
    "Claude Max": 9.7,
    "ChatGPT Enterprise": 9.5,
    "Anthropic API Direct": 9.5,
    "ChatGPT Team": 9.4,
    "Claude Pro": 9.4,
    "OpenAI API Direct": 9.2,
    "Gemini Ultra": 9.0,
    "Gemini API": 8.9,
    "ChatGPT Plus": 8.9,
    "Gemini Pro": 8.5,
    "Claude Free": 8.4,
    "Windsurf Pro": 6.5,
    "GitHub Copilot Enterprise": 5.5,
  },

  writing: {
    "Claude Enterprise": 9.9,
    "Claude Team": 9.8,
    "Claude Max": 9.8,
    "Claude Pro": 9.7,
    "ChatGPT Enterprise": 9.7,
    "ChatGPT Team": 9.6,
    "Anthropic API Direct": 9.5,
    "ChatGPT Plus": 9.4,
    "OpenAI API Direct": 9.2,
    "Gemini Ultra": 9.0,
    "Gemini API": 8.8,
    "Gemini Pro": 8.7,
    "Cursor Pro": 7.0,
    "Windsurf Pro": 6.5,
    "GitHub Copilot Enterprise": 5.5,
  },

  data: {
    "ChatGPT Enterprise": 9.8,
    "OpenAI API Direct": 9.7,
    "ChatGPT Team": 9.5,
    "Gemini Ultra": 9.4,
    "Gemini API": 9.3,
    "Claude Enterprise": 9.2,
    "ChatGPT Plus": 9.0,
    "Claude Team": 9.0,
    "Claude Max": 8.8,
    "Anthropic API Direct": 8.8,
    "Gemini Pro": 8.8,
    "Claude Pro": 8.2,
    "Cursor Pro": 6.2,
    "Windsurf Pro": 5.8,
    "GitHub Copilot Enterprise": 5.0,
  },

  mixed: {
    "ChatGPT Enterprise": 9.9,
    "ChatGPT Team": 9.7,
    "Claude Enterprise": 9.7,
    "Claude Team": 9.5,
    "OpenAI API Direct": 9.5,
    "Claude Max": 9.4,
    "Gemini Ultra": 9.2,
    "ChatGPT Plus": 9.2,
    "Anthropic API Direct": 9.1,
    "Gemini API": 9.0,
    "Claude Pro": 8.9,
    "Gemini Pro": 8.7,
    "Cursor Pro": 8.0,
    "Windsurf Pro": 7.4,
    "GitHub Copilot Enterprise": 6.5,
  },
};

export const useCaseBenchmarks: UseCaseBenchmark[] = [
  {
    useCase: "coding",
    minCostPerEmployee: 35,
    targetCostPerEmployee: 60,
    maxCostPerEmployee: 90,
  },
  {
    useCase: "writing",
    minCostPerEmployee: 20,
    targetCostPerEmployee: 35,
    maxCostPerEmployee: 50,
  },
  {
    useCase: "research",
    minCostPerEmployee: 30,
    targetCostPerEmployee: 55,
    maxCostPerEmployee: 80,
  },
  {
    useCase: "data",
    minCostPerEmployee: 25,
    targetCostPerEmployee: 45,
    maxCostPerEmployee: 70,
  },
  {
    useCase: "mixed",
    minCostPerEmployee: 40,
    targetCostPerEmployee: 65,
    maxCostPerEmployee: 100,
  },
];