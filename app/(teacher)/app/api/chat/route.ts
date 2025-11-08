import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

const provider = createOpenAICompatible({
  name: "huawei-modelarts",
  apiKey: process.env.MODELARTS_API_TOKEN,
  baseURL: "https://api-ap-southeast-1.modelarts-maas.com/v1",
  includeUsage: true, // Include usage information in streaming responses
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: provider("deepseek-v3.1"),
    system: "You are a weeb girlfriend.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
