import type { ComparisonInput } from "@/lib/types";

function normalizeList(list: string[] | undefined): string[] {
  if (!list) return [];
  return list
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export function buildComparePrompt(input: ComparisonInput): string {
  const competitors = normalizeList(input.competitorNames).slice(0, 3);
  const products = [input.ourProductName.trim(), ...competitors];
  const additionalAxes = normalizeList(input.additionalAxes);

  const contextLines: string[] = [
    `あなたはBtoB SaaSのGTM（セールス/マーケ）向けに、競合比較表を作る専門家です。`,
    `目的は「商談/提案/Slackにそのまま貼れる、読みやすい比較表」を作ることです。`,
    ``,
    `比較対象（products）: ${products.map((p) => `"${p}"`).join(", ")}`,
  ];

  if (input.industry?.trim()) contextLines.push(`業界: ${input.industry.trim()}`);
  if (input.targetCustomer?.trim())
    contextLines.push(`主要ターゲット顧客: ${input.targetCustomer.trim()}`);
  if (input.ourStrengths?.trim())
    contextLines.push(`自社でアピールしたい強み: ${input.ourStrengths.trim()}`);
  if (additionalAxes.length)
    contextLines.push(`追加したい比較軸（優先）: ${additionalAxes.map((a) => `"${a}"`).join(", ")}`);

  const rules = [
    `【出力ルール（最重要）】`,
    `- 返答は「JSONのみ」。前後に説明文、コードフェンス、マークダウン、コメントを付けない。`,
    `- ratingは必ず「良い」「普通」「要改善」の3択のみ（記号・絵文字・英語は使わない）。`,
    `- 軸（axes）は8〜12個。価格/機能/サポート/導入実績/セキュリティ等の一般的な軸を含める。`,
    `- 不確実な場合はreason内に「推測」「一般論」などを明示し、断定しない。`,
    `- productsは上の比較対象の順序を厳守する。`,
    ``,
    `【出力JSONスキーマ】`,
    `{`,
    `  "axes": [ { "axis": "価格", "description": "任意" } ],`,
    `  "products": ${JSON.stringify(products)},`,
    `  "cells": {`,
    `    "価格": {`,
    `      "${products[0]}": { "rating": "良い", "reason": "理由" },`,
    `      "${products[Math.min(1, products.length - 1)]}": { "rating": "普通", "reason": "理由" }`,
    `    }`,
    `  },`,
    `  "notes": ["前提や注意点（任意）"]`,
    `}`,
    ``,
    `【タスク】`,
    `- axesを決め、各axis×productについて rating と reason（短く具体的）を埋める。`,
    `- reasonは「良い：理由」形式にせず、reasonフィールドに理由だけを書く。`,
  ];

  return `${contextLines.join("\n")}\n\n${rules.join("\n")}`;
}

