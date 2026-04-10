"use client";

import { useMemo, useState } from "react";
import type { ComparisonInput, ComparisonResult, TalkResult } from "@/lib/types";
import { copyToClipboard } from "@/lib/clipboard";

export function TalkPanel(props: {
  apiKey: string;
  input: ComparisonInput | null;
  result: ComparisonResult | null;
}) {
  const { apiKey, input, result } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [talk, setTalk] = useState<TalkResult | null>(null);
  const [copied, setCopied] = useState(false);

  const enabled = useMemo(() => Boolean(apiKey.trim() && input && result), [apiKey, input, result]);

  async function generateTalk() {
    if (!enabled) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/talk", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ apiKey, input, result }),
      });
      const json = (await res.json()) as
        | { prompt: string; talk: TalkResult }
        | { error: string };

      if (!res.ok) {
        const msg = "error" in json ? json.error : "生成に失敗しました。";
        throw new Error(msg);
      }
      if (!("prompt" in json)) throw new Error("不正なレスポンスです。");
      setPrompt(json.prompt);
      setTalk(json.talk);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  if (!result) return null;

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-900">営業トーク提案（任意）</h2>
          <p className="mt-1 text-sm text-zinc-600">
            比較表を元に、「なぜ自社が強いか」を3〜5文で要約します。
          </p>
        </div>

        <button
          type="button"
          onClick={generateTalk}
          disabled={!enabled || loading}
          className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "生成中…" : "トークを生成"}
        </button>
      </div>

      {error ? (
        <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900">
          {error}
        </div>
      ) : null}

      {talk ? (
        <div className="mt-4 grid grid-cols-1 gap-3">
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-semibold text-zinc-700">要約</div>
              <button
                type="button"
                onClick={async () => {
                  const lines = [
                    talk.summary,
                    ...(talk.bullets?.length ? ["", ...talk.bullets.map((b) => `- ${b}`)] : []),
                  ].join("\n");
                  await copyToClipboard(lines);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                }}
                className="inline-flex h-8 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-xs font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                {copied ? "コピーしました" : "コピー"}
              </button>
            </div>
            <div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-900">
              {talk.summary}
            </div>
            {talk.bullets?.length ? (
              <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-zinc-900">
                {talk.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : null}
          </div>

          {prompt ? (
            <details className="rounded-md border border-zinc-200 bg-white p-3">
              <summary className="cursor-pointer text-sm font-semibold text-zinc-900">
                送信プロンプト（トーク提案）
              </summary>
              <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-900">
                {prompt}
              </pre>
            </details>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

