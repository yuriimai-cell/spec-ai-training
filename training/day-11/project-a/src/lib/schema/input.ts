import { z } from "zod";

export const comparisonInputSchema = z.object({
  ourProductName: z.string().min(1),
  competitorNames: z.array(z.string().min(1)).min(1).max(3),
  industry: z.string().min(1).optional(),
  targetCustomer: z.string().min(1).optional(),
  ourStrengths: z.string().min(1).optional(),
  additionalAxes: z.array(z.string().min(1)).optional(),
});

export type ComparisonInput = z.infer<typeof comparisonInputSchema>;

