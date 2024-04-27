import * as z from "zod";

export const QuestContext = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export type QuestContext = z.infer<typeof QuestContext>;
