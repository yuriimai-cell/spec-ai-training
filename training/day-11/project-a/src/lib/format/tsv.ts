import type { ComparisonResult } from "@/lib/types";
import { cellToText, sanitizeSingleLine } from "@/lib/format/common";

function escapeTsvCell(text: string): string {
  // Tabs/newlines break TSV; normalize to single-line.
  return sanitizeSingleLine(text).replace(/\t/g, " ");
}

export function formatTSV(result: ComparisonResult): string {
  const header = ["比較軸", ...result.products].map(escapeTsvCell).join("\t");
  const rows: string[] = [header];

  for (const a of result.axes) {
    const axis = escapeTsvCell(a.axis);
    const cells = result.products.map((p) => {
      const cell = result.cells?.[a.axis]?.[p];
      return cell ? escapeTsvCell(cellToText(cell)) : "—";
    });
    rows.push([axis, ...cells].join("\t"));
  }

  return rows.join("\n");
}

