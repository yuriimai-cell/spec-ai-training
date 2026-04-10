import { z } from "zod";

export const talkResultSchema = z.object({
  summary: z.string().min(1),
  bullets: z.array(z.string().min(1)).optional(),
});

export type TalkResult = z.infer<typeof talkResultSchema>;

