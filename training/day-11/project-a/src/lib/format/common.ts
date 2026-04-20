import type { ComparisonCell } from "@/lib/types";

export function cellToText(cell: ComparisonCell): string {
  const rating = cell.rating;
  const reason = cell.reason.replace(/\s+/g, " ").trim();
  return `${rating}：${reason}`;
}

export function sanitizeSingleLine(text: string): string {
  return text.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
}

