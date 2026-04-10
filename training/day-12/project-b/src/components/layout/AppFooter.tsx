'use client';

interface AppFooterProps {
  onExportPdf: () => void;
  onExportWord: () => void;
  onReset: () => void;
  hasErrors: boolean;
}

export default function AppFooter({ onExportPdf, onExportWord, onReset, hasErrors }: AppFooterProps) {
  return (
    <footer className="flex-none h-14 border-t bg-white flex items-center justify-between px-6 print:hidden">
      <button
        onClick={onReset}
        className="text-sm text-red-500 hover:text-red-700 underline"
      >
        フォームをリセット
      </button>

      <div className="flex items-center gap-3">
        {hasErrors && (
          <span className="text-sm text-red-500">必須項目を入力してください</span>
        )}
        <button
          onClick={onExportWord}
          className="px-4 py-2 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
        >
          Word出力 (.doc)
        </button>
        <button
          onClick={onExportPdf}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          PDF出力 (印刷)
        </button>
      </div>
    </footer>
  );
}
