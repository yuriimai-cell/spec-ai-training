"use client";

import { useMemo, useState } from "react";
import type { ComparisonInput } from "@/lib/types";

type FormState = {
  ourProductName: string;
  competitor1: string;
  competitor2: string;
  competitor3: string;
  industry: string;
  targetCustomer: string;
  ourStrengths: string;
  additionalAxes: string; // comma separated
};

function parseAxes(text: string): string[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ComparisonForm(props: {
  disabled?: boolean;
  initial?: Partial<FormState>;
  onSubmit: (input: ComparisonInput) => Promise<void> | void;
}) {
  const { disabled, initial, onSubmit } = props;
  const [form, setForm] = useState<FormState>({
    ourProductName: initial?.ourProductName ?? "",
    competitor1: initial?.competitor1 ?? "",
    competitor2: initial?.competitor2 ?? "",
    competitor3: initial?.competitor3 ?? "",
    industry: initial?.industry ?? "",
    targetCustomer: initial?.targetCustomer ?? "",
    ourStrengths: initial?.ourStrengths ?? "",
    additionalAxes: initial?.additionalAxes ?? "",
  });

  const competitors = useMemo(
    () => [form.competitor1, form.competitor2, form.competitor3].map((s) => s.trim()).filter(Boolean),
    [form.competitor1, form.competitor2, form.competitor3],
  );

  const canSubmit = form.ourProductName.trim().length > 0 && competitors.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const input: ComparisonInput = {
      ourProductName: form.ourProductName.trim(),
      competitorNames: competitors.slice(0, 3),
      industry: form.industry.trim() || undefined,
      targetCustomer: form.targetCustomer.trim() || undefined,
      ourStrengths: form.ourStrengths.trim() || undefined,
      additionalAxes: parseAxes(form.additionalAxes),
    };
    await onSubmit(input);
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-zinc-900">入力</h2>
      <p className="mt-1 text-sm text-zinc-600">
        自社と競合（最大3社）を入力し、「比較表を生成」を押してください。
      </p>

      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-zinc-800">自社製品名</span>
          <input
            value={form.ourProductName}
            onChange={(e) => setForm((p) => ({ ...p, ourProductName: e.target.value }))}
            className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-500"
            placeholder="例：Product X"
            disabled={disabled}
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {([
            ["competitor1", "競合製品名（1）", "例：Competitor A"],
            ["competitor2", "競合製品名（2）", "例：Competitor B（任意）"],
            ["competitor3", "競合製品名（3）", "例：Competitor C（任意）"],
          ] as const).map(([key, label, placeholder]) => (
            <label key={key} className="flex flex-col gap-1">
              <span className="text-sm font-medium text-zinc-800">{label}</span>
              <input
                value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-500"
                placeholder={placeholder}
                disabled={disabled}
              />
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-zinc-800">業界（任意）</span>
            <input
              value={form.industry}
              onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))}
              className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-500"
              placeholder="例：SaaS / EC / HR"
              disabled={disabled}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-zinc-800">主要ターゲット顧客（任意）</span>
            <input
              value={form.targetCustomer}
              onChange={(e) => setForm((p) => ({ ...p, targetCustomer: e.target.value }))}
              className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-500"
              placeholder="例：従業員100〜500名のIT部門"
              disabled={disabled}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-zinc-800">自社でアピールしたい強み（任意）</span>
          <textarea
            value={form.ourStrengths}
            onChange={(e) => setForm((p) => ({ ...p, ourStrengths: e.target.value }))}
            className="min-h-24 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500"
            placeholder="例：導入が早い、UIが直感的、サポートが手厚い…"
            disabled={disabled}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-zinc-800">追加したい比較軸（任意・カンマ区切り）</span>
          <input
            value={form.additionalAxes}
            onChange={(e) => setForm((p) => ({ ...p, additionalAxes: e.target.value }))}
            className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-500"
            placeholder="例：運用負荷, 監査対応, 国内サポート"
            disabled={disabled}
          />
        </label>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">
            必須：自社製品名、競合製品名（少なくとも1社）
          </p>
          <button
            type="submit"
            disabled={disabled || !canSubmit}
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            比較表を生成
          </button>
        </div>
      </form>
    </section>
  );
}

