import * as z from "zod";

export const BidContext = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export type BidContext = z.infer<typeof BidContext>;
