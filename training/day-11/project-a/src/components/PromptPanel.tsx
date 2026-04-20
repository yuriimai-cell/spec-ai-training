"use client";

import { useMemo, useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";

export function PromptPanel(props: { prompt: string | null }) {
  const { prompt } = props;
  const [copied, setCopied] = useState(false);

  const visible = useMemo(() => Boolean(prompt && prompt.trim()), [prompt]);

  if (!visible) return null;

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <details className="group">
        <summary className="cursor-pointer select-none list-none">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-zinc-900">送信プロンプト（ソース）</h2>
              <p className="mt-1 text-sm text-zinc-600">
                出力に違和感があるとき、ここを見て原因特定・改善できます。
              </p>
            </div>
            <span className="text-sm text-zinc-600 group-open:hidden">開く</span>
            <span className="text-sm text-zinc-600 hidden group-open:inline">閉じる</span>
          </div>
        </summary>

        <div className="mt-4">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={async () => {
                await copyToClipboard(prompt!);
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              {copied ? "コピーしました" : "コピー"}
            </button>
          </div>
          <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-900">
            {prompt}
          </pre>
        </div>
      </details>
    </section>
  );
}

