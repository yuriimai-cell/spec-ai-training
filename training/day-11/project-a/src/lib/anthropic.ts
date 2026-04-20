type AnthropicMessageResponse = {
  content: Array<
    | { type: "text"; text: string }
    | { type: string; [k: string]: unknown }
  >;
};

function isTextBlock(
  block: AnthropicMessageResponse["content"][number],
): block is { type: "text"; text: string } {
  return block.type === "text" && typeof (block as any).text === "string";
}

export async function callAnthropicJSON(args: {
  apiKey: string;
  model: string;
  prompt: string;
  timeoutMs?: number;
}): Promise<{ rawText: string }> {
  const { apiKey, model, prompt, timeoutMs = 20000 } = args;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1800,
        temperature: 0.2,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Anthropic API error (${res.status}): ${text || res.statusText}`);
    }

    const json = (await res.json()) as AnthropicMessageResponse;
    const rawText = json.content?.find(isTextBlock)?.text ?? "";
    return { rawText };
  } finally {
    clearTimeout(timeout);
  }
}

