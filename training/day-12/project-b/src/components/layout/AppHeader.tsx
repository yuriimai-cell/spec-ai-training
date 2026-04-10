'use client';

import { useSaveIndicator } from '@/hooks/useSaveIndicator';

interface AppHeaderProps {
  lastSavedAt: number | null;
}

export default function AppHeader({ lastSavedAt }: AppHeaderProps) {
  const saveText = useSaveIndicator(lastSavedAt);

  return (
    <header className="flex-none h-14 border-b bg-white flex items-center justify-between px-6 shadow-sm print:hidden">
      <div>
        <h1 className="text-lg font-bold text-slate-800">商談議事録テンプレートジェネレーター</h1>
        <p className="text-xs text-slate-400">営業支援ツール v1.3</p>
      </div>
      {saveText && (
        <span className="text-sm text-slate-400 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
          {saveText}
        </span>
      )}
    </header>
  );
}
