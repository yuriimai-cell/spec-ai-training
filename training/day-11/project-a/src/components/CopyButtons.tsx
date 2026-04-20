"use client";

import { useState } from "react";
import type { ComparisonResult } from "@/lib/types";
import { formatMarkdown } from "@/lib/format/markdown";
import { formatHTML } from "@/lib/format/html";
import { formatTSV } from "@/lib/format/tsv";
import { copyToClipboard } from "@/lib/clipboard";

export function CopyButtons(props: { result: ComparisonResult | null }) {
  const { result } = props;
  const disabled = !result;
  const [status, setStatus] = useState<string | null>(null);

  async function handleCopy(kind: "markdown" | "html" | "tsv") {
    if (!result) return;
    try {
      const text =
        kind === "markdown"
          ? formatMarkdown(result)
          : kind === "html"
            ? formatHTML(result)
            : formatTSV(result);
      await copyToClipboard(text);
      setStatus(`${kind.toUpperCase()}をコピーしました`);
      setTimeout(() => setStatus(null), 1200);
    } catch {
      setStatus("コピーに失敗しました（ブラウザ権限を確認してください）");
      setTimeout(() => setStatus(null), 2000);
    }
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-zinc-900">コピー</h2>
      <p className="mt-1 text-sm text-zinc-600">
        Slack / Notion / メール / Excel に貼り付けできる形式でコピーします。
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          disabled={disabled}
          className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleCopy("markdown")}
        >
          Markdownコピー
        </button>
        <button
          type="button"
          disabled={disabled}
          className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleCopy("html")}
        >
          HTMLコピー
        </button>
        <button
          type="button"
          disabled={disabled}
          className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => handleCopy("tsv")}
        >
          TSVコピー
        </button>
      </div>

      {status ? <div className="mt-3 text-sm text-zinc-700">{status}</div> : null}
    </section>
  );
}

