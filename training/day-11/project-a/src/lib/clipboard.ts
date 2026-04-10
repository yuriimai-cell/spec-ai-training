export async function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback (older Safari / restricted contexts)
  if (typeof document === "undefined") throw new Error("Clipboard not available");

  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.top = "0";
  el.style.left = "0";
  el.style.opacity = "0";
  document.body.appendChild(el);

  el.focus();
  el.select();

  const ok = document.execCommand("copy");
  document.body.removeChild(el);

  if (!ok) throw new Error("Copy failed");
}

