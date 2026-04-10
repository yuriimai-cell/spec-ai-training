import { NextResponse } from "next/server";
import { z } from "zod";
import { callAnthropicJSON } from "@/lib/anthropic";
import { extractFirstJsonObject } from "@/lib/json";
import { buildComparePrompt } from "@/lib/prompt/comparePrompt";
import { compareResultSchema } from "@/lib/schema/compareResult";
import { comparisonInputSchema } from "@/lib/schema/input";

const requestSchema = z.object({
  apiKey: z.string().min(1),
  input: comparisonInputSchema,
});

function toUserMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("401")) return "APIキーが無効です（401）。入力内容を確認してください。";
  if (msg.includes("429")) return "リクエストが多すぎます（429）。少し待ってから再実行してください。";
  if (msg.includes("abort")) return "タイムアウトしました。時間をおいて再実行してください。";
  return "生成に失敗しました。入力を見直して再実行してください。";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, input } = requestSchema.parse(body);

    const prompt = buildComparePrompt(input);
    const { rawText } = await callAnthropicJSON({
      apiKey,
      model: "claude-sonnet-4",
      prompt,
      timeoutMs: 20000,
    });

    const jsonText = extractFirstJsonObject(rawText) ?? rawText;
    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      throw new Error("Claudeの返答がJSONとして解釈できませんでした。再生成してください。");
    }

    const result = compareResultSchema.parse(parsed);

    return NextResponse.json({ prompt, result });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "入力または出力の形式が不正です。", details: err.issues },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: toUserMessage(err) }, { status: 500 });
  }
}

