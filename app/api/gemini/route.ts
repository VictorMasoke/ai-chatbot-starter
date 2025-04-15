import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/data";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

export const runtime = "edge";

// Helpers
const generateId = () => Math.random().toString(36).substring(2, 15);

const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => [
  {
    id: generateId(),
    role: "user",
    content: initialMessage.content,
  },
  ...messages.map((message) => ({
    id: generateId(),
    role: message.role,
    content: message.content,
  })),
];

// ---------------------------
// Intent Detection
// ---------------------------
interface Intent {
  type: "enquiry" | "deposit" | "withdrawal" | "portfolio" | "unknown";
  params?: { amount?: number; currency?: string };
}

/**
 * A simple rule-based intent detector. It checks if the message contains
 * keywords for deposit, withdrawal, or portfolio. If none match, it's routed
 * as an enquiry.
 */
function detectIntent(input: string): Intent {
  const lowerInput = input.toLowerCase();

  // Deposit detection (e.g., "I want to deposit 300 USD using ecocah")
  const depositMatch = lowerInput.match(/deposit.*?(\d+(\.\d+)?)/);
  if (depositMatch) {
    return {
      type: "deposit",
      params: { amount: parseFloat(depositMatch[1]), currency: "USD" },
    };
  }

  // Withdrawal detection (e.g., "I want to withdraw 300 USD")
  const withdrawalMatch = lowerInput.match(/withdraw.*?(\d+(\.\d+)?)/);
  if (withdrawalMatch) {
    return {
      type: "withdrawal",
      params: { amount: parseFloat(withdrawalMatch[1]), currency: "USD" },
    };
  }

  // Portfolio (e.g., "I want to see my portfolio")
  if (lowerInput.includes("portfolio")) {
    return { type: "portfolio" };
  }

  // Default to enquiry (chatting with Gemini)
  return { type: "enquiry" };
}

// ---------------------------
// Endpoint Handlers
// ---------------------------

/** Handler for conversational queries using Gemini. */
async function handleEnquiry(messages: Message[]) {
  const stream = await streamText({
    model: google("gemini-2.0-flash"),
    messages: buildGoogleGenAIPrompt(messages),
    temperature: 0.7,
  });
  return stream.toDataStreamResponse();
}

/** Handler to post a deposit request to your deposit endpoint. */
async function handleDeposit(params?: { amount?: number; currency?: string }) {
  if (!params?.amount) {
    return new Response("Deposit amount not specified", { status: 400 });
  }
  console.log(params);
//   const depositResponse = await fetch("https://yourapi.com/deposit", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       amount: params.amount,
//       currency: params.currency,
//     }),
//   });
//   const result = await depositResponse.json();
  return new Response(JSON.stringify("Nice work broo on deposit"), { status: 200 });
}

/** Handler to post a withdrawal request to your withdrawal endpoint. */
async function handleWithdrawal(params?: { amount?: number; currency?: string }) {
  if (!params?.amount) {
    return new Response("Withdrawal amount not specified", { status: 400 });
  }
  console.log(params);
//   const withdrawalResponse = await fetch("https://yourapi.com/withdrawal", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       amount: params.amount,
//       currency: params.currency,
//     }),
//   });
//   const result = await withdrawalResponse.json();
  return new Response(JSON.stringify("Nice job on withdrawal"), { status: 200 });
}

/** Handler to fetch portfolio information from the portfolio endpoint. */
async function handlePortfolio() {
//   const portfolioResponse = await fetch("https://yourapi.com/portfolio", {
//     method: "GET", // or "POST", adjust as needed based on your endpoint design
//   });
//   const result = await portfolioResponse.json();
  return new Response(JSON.stringify("Nice work on portfolio"), { status: 200 });
}

// ---------------------------
// Main Request Handler
// ---------------------------
async function handleRequest(req: Request) {
  const { messages } = await req.json();
  // Assume the last message contains the user's latest input
  const userInput = messages[messages.length - 1]?.content || "";
  const intent = detectIntent(userInput);

  switch (intent.type) {
    case "deposit":
      return await handleDeposit(intent.params);
    case "withdrawal":
      return await handleWithdrawal(intent.params);
    case "portfolio":
      return await handlePortfolio();
    case "enquiry":
    default:
      return await handleEnquiry(messages);
  }
}

export async function POST(req: Request) {
  return handleRequest(req);
}
