"use client";

import { useMemo, useState } from "react";
import { ApiKeyPanel } from "@/components/ApiKeyPanel";
import { ComparisonForm } from "@/components/ComparisonForm";
import { PromptPanel } from "@/components/PromptPanel";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CopyButtons } from "@/components/CopyButtons";
import { TalkPanel } from "@/components/TalkPanel";
import type { ComparisonInput, ComparisonResult } from "@/lib/types";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [persistApiKey, setPersistApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [lastInput, setLastInput] = useState<ComparisonInput | null>(null);

  const canGenerate = useMemo(() => apiKey.trim().length > 0, [apiKey]);

  async function generate(input: ComparisonInput) {
    if (!canGenerate) {
      setError("Anthropic APIキーを入力してください。");
      return;
    }

    setLoading(true);
    setError(null);
    setLastInput(input);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ apiKey, input }),
      });

      const json = (await res.json()) as
        | { prompt: string; result: ComparisonResult }
        | { error: string };

      if (!res.ok) {
        const msg = "error" in json ? json.error : "生成に失敗しました。";
        throw new Error(msg);
      }

      if (!("prompt" in json)) throw new Error("不正なレスポンスです。");
      setPrompt(json.prompt);
      setResult(json.result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-full bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            競合比較表ビルダー
          </h1>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            自社と競合の情報を入力すると、比較表をAIが生成します。送信プロンプト（ソース）も確認・コピーできます。
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6">
        <ApiKeyPanel
          apiKey={apiKey}
          setApiKey={setApiKey}
          persist={persistApiKey}
          setPersist={setPersistApiKey}
        />

        <ComparisonForm disabled={loading} onSubmit={generate} />

        {loading ? (
          <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
              <div className="text-sm font-medium text-zinc-900">生成中…（10〜20秒目安）</div>
            </div>
            <p className="mt-2 text-sm text-zinc-600">
              生成が長い場合は、比較軸や強みを具体化すると安定します。
            </p>
          </section>
        ) : null}

        {error ? (
          <section className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900">
            <div className="text-sm font-semibold">エラー</div>
            <div className="mt-1 text-sm">{error}</div>
          </section>
        ) : null}

        <PromptPanel prompt={prompt} />
        <ComparisonTable result={result} />
        <CopyButtons result={result} />
        <TalkPanel apiKey={apiKey} input={lastInput} result={result} />
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-10 pt-6 text-xs text-zinc-500 sm:px-6">
        <p>
          注意：このツールは入力内容を保存しません（APIキー保存は任意）。生成内容の正確性は必ずご自身で確認してください。
        </p>
      </footer>
    </div>
  );
}
