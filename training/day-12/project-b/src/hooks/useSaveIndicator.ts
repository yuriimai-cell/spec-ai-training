import { useEffect, useState } from 'react';

export function useSaveIndicator(lastSavedAt: number | null): string {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (lastSavedAt === null) {
      setDisplayText('');
      return;
    }

    function update() {
      if (lastSavedAt === null) return;
      const elapsed = Math.floor((Date.now() - lastSavedAt) / 1000);
      if (elapsed < 60) {
        setDisplayText('最終保存：たった今');
      } else if (elapsed < 3600) {
        setDisplayText(`最終保存：${Math.floor(elapsed / 60)}分前`);
      } else {
        setDisplayText(`最終保存：${Math.floor(elapsed / 3600)}時間前`);
      }
    }

    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, [lastSavedAt]);

  return displayText;
}
