import type { ComparisonInput, ComparisonResult } from "@/lib/types";

export function buildTalkPrompt(args: {
  input: ComparisonInput;
  result: ComparisonResult;
}): string {
  const { input, result } = args;
  const products = result.products;
  const our = products[0];
  const competitors = products.slice(1);

  return [
    `あなたはBtoB SaaSのセールス支援に強いコンサルです。`,
    `以下の比較表結果を元に、「${our}が競合に強い理由」を3〜5文で日本語で要約してください。`,
    `トーンは営業が商談でそのまま話せる自然な文体。誇張しない。不確実な点は断定しない。`,
    ``,
    `【出力ルール（最重要）】`,
    `- 返答は「JSONのみ」。前後に説明文、コードフェンス、マークダウン、コメントを付けない。`,
    `- summaryは3〜5文。bulletsは任意（3〜5個）で、短い箇条書き。`,
    ``,
    `【入力】`,
    `自社: ${our}`,
    `競合: ${competitors.map((c) => `"${c}"`).join(", ") || "なし"}`,
    input.industry?.trim() ? `業界: ${input.industry.trim()}` : undefined,
    input.targetCustomer?.trim()
      ? `主要ターゲット顧客: ${input.targetCustomer.trim()}`
      : undefined,
    input.ourStrengths?.trim() ? `自社でアピールしたい強み: ${input.ourStrengths.trim()}` : undefined,
    ``,
    `【比較表（JSON）】`,
    JSON.stringify(result),
    ``,
    `【出力JSONスキーマ】`,
    `{ "summary": "3〜5文", "bullets": ["短い箇条書き（任意）"] }`,
  ]
    .filter((v): v is string => Boolean(v))
    .join("\n");
}

