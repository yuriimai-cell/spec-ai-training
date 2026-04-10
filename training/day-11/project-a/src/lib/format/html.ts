import type { ComparisonResult } from "@/lib/types";
import { cellToText, sanitizeSingleLine } from "@/lib/format/common";

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatHTML(result: ComparisonResult): string {
  const thStyle =
    "border:1px solid #e4e4e7;padding:8px;background:#fafafa;text-align:left;font-weight:600;font-size:12px;";
  const tdStyle =
    "border:1px solid #e4e4e7;padding:8px;vertical-align:top;font-size:12px;";
  const axisStyle = "font-weight:600;";

  const headerCells = ["比較軸", ...result.products].map(
    (h) => `<th style="${thStyle}">${escapeHtml(sanitizeSingleLine(h))}</th>`,
  );

  const bodyRows = result.axes
    .map((a) => {
      const axis = `<td style="${tdStyle}${axisStyle}">${escapeHtml(
        sanitizeSingleLine(a.axis),
      )}</td>`;
      const tds = result.products
        .map((p) => {
          const cell = result.cells?.[a.axis]?.[p];
          const text = cell ? cellToText(cell) : "—";
          return `<td style="${tdStyle}">${escapeHtml(text)}</td>`;
        })
        .join("");
      return `<tr>${axis}${tds}</tr>`;
    })
    .join("");

  return [
    `<table style="border-collapse:collapse;width:100%;">`,
    `<thead><tr>${headerCells.join("")}</tr></thead>`,
    `<tbody>${bodyRows}</tbody>`,
    `</table>`,
  ].join("");
}

