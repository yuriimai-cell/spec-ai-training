import { z } from "zod";

export const ratingSchema = z.enum(["良い", "普通", "要改善"]);

export const axisSchema = z.object({
  axis: z.string().min(1),
  description: z.string().min(1).optional(),
});

export const comparisonCellSchema = z.object({
  rating: ratingSchema,
  reason: z.string().min(1),
});

/**
 * Claude response shape (JSON only):
 * {
 *   axes: [{ axis, description? }, ...],
 *   products: ["自社", "競合A", ...],
 *   cells: { [axis]: { [product]: { rating, reason } } },
 *   notes?: string[]
 * }
 */
export const compareResultSchema = z
  .object({
    axes: z.array(axisSchema).min(8).max(12),
    products: z.array(z.string().min(1)).min(2).max(4),
    cells: z.record(
      z.string(),
      z.record(z.string(), comparisonCellSchema),
    ),
    notes: z.array(z.string().min(1)).optional(),
  })
  .superRefine((val, ctx) => {
    const axisSet = new Set(val.axes.map((a) => a.axis));
    const productSet = new Set(val.products);

    // ensure cells cover known axis/product keys only (but allow extra axes if model returns)
    for (const [axis, byProduct] of Object.entries(val.cells)) {
      if (!axisSet.has(axis)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cells", axis],
          message: `cellsに未知のaxis '${axis}' が含まれています`,
        });
      }
      for (const product of Object.keys(byProduct)) {
        if (!productSet.has(product)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["cells", axis, product],
            message: `cellsに未知のproduct '${product}' が含まれています`,
          });
        }
      }
    }

    // ensure every axis has all products
    for (const axis of val.axes.map((a) => a.axis)) {
      const row = val.cells[axis];
      if (!row) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cells", axis],
          message: `cellsにaxis '${axis}' の行がありません`,
        });
        continue;
      }
      for (const product of val.products) {
        if (!row[product]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["cells", axis, product],
            message: `cellsにaxis '${axis}' の product '${product}' がありません`,
          });
        }
      }
    }
  });

export type CompareResult = z.infer<typeof compareResultSchema>;

