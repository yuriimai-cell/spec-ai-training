"use client";

import type { ComparisonResult, Rating } from "@/lib/types";

function ratingBadgeClass(rating: Rating): string {
  switch (rating) {
    case "良い":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "普通":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    case "要改善":
      return "bg-rose-50 text-rose-700 ring-rose-200";
  }
}

export function ComparisonTable(props: { result: ComparisonResult | null }) {
  const { result } = props;
  if (!result) return null;

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-900">比較表</h2>
          <p className="mt-1 text-sm text-zinc-600">
            評価は「良い / 普通 / 要改善」に統一しています。
          </p>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[860px] w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white border-b border-zinc-200 px-3 py-2 text-left text-xs font-semibold text-zinc-700">
                比較軸
              </th>
              {result.products.map((p) => (
                <th
                  key={p}
                  className="border-b border-zinc-200 px-3 py-2 text-left text-xs font-semibold text-zinc-700"
                >
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.axes.map((a) => {
              const axis = a.axis;
              return (
                <tr key={axis} className="align-top">
                  <td className="sticky left-0 z-10 bg-white border-b border-zinc-100 px-3 py-3">
                    <div className="text-sm font-semibold text-zinc-900">{axis}</div>
                    {a.description ? (
                      <div className="mt-1 text-xs text-zinc-600">{a.description}</div>
                    ) : null}
                  </td>
                  {result.products.map((p) => {
                    const cell = result.cells?.[axis]?.[p];
                    return (
                      <td key={p} className="border-b border-zinc-100 px-3 py-3">
                        {cell ? (
                          <div className="flex flex-col gap-2">
                            <span
                              className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${ratingBadgeClass(
                                cell.rating,
                              )}`}
                            >
                              {cell.rating}
                            </span>
                            <div className="text-sm leading-6 text-zinc-900">{cell.reason}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-zinc-500">—</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {result.notes?.length ? (
        <div className="mt-4 rounded-md border border-zinc-200 bg-zinc-50 p-3">
          <div className="text-xs font-semibold text-zinc-700">前提 / 注意点</div>
          <ul className="mt-2 list-disc pl-5 text-xs leading-5 text-zinc-700">
            {result.notes.map((n, idx) => (
              <li key={idx}>{n}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

