import type { ComparisonResult } from "@/lib/types";
import { cellToText, sanitizeSingleLine } from "@/lib/format/common";

function escapePipes(text: string): string {
  return text.replaceAll("|", "\\|");
}

export function formatMarkdown(result: ComparisonResult): string {
  const products = result.products.map((p) => escapePipes(sanitizeSingleLine(p)));
  const header = ["比較軸", ...products];
  const separator = header.map(() => "---");

  const lines: string[] = [];
  lines.push(`| ${header.join(" | ")} |`);
  lines.push(`| ${separator.join(" | ")} |`);

  for (const a of result.axes) {
    const axis = escapePipes(sanitizeSingleLine(a.axis));
    const cells = result.products.map((p) => {
      const cell = result.cells?.[a.axis]?.[p];
      return cell ? escapePipes(cellToText(cell)) : "—";
    });
    lines.push(`| ${[axis, ...cells].join(" | ")} |`);
  }

  if (result.notes?.length) {
    lines.push("");
    lines.push("**前提 / 注意点**");
    for (const n of result.notes) {
      lines.push(`- ${sanitizeSingleLine(n)}`);
    }
  }

  return lines.join("\n");
}

