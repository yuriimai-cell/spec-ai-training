"use client";

import { useEffect, useState } from "react";
import { readStorage, removeStorage, writeStorage } from "@/lib/storage";

export function ApiKeyPanel(props: {
  apiKey: string;
  setApiKey: (v: string) => void;
  persist: boolean;
  setPersist: (v: boolean) => void;
}) {
  const { apiKey, setApiKey, persist, setPersist } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedPersist = readStorage<boolean>("persistApiKey");
    const savedKey = readStorage<string>("apiKey");
    if (typeof savedPersist === "boolean") setPersist(savedPersist);
    if (savedPersist && savedKey) setApiKey(savedKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mounted) return;
    writeStorage("persistApiKey", persist);
    if (persist) writeStorage("apiKey", apiKey);
    else removeStorage("apiKey");
  }, [apiKey, mounted, persist]);

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-zinc-900">設定</h2>
      <p className="mt-1 text-sm text-zinc-600">
        Anthropic APIキーはこのブラウザ内だけで使用します。保存しない場合はリロードで消えます。
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-1">
          <span className="text-sm font-medium text-zinc-800">Anthropic APIキー</span>
          <input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-500"
            autoComplete="off"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={persist}
            onChange={(e) => setPersist(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300"
          />
          このブラウザに保存する
        </label>
      </div>
    </section>
  );
}

