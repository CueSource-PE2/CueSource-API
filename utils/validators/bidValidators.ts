import * as z from "zod";

export const BidCreateProps = z.object({
  Quest: z.object({
    connect: z.object({
      id: z.string().cuid(),
    }),
  }),
  bidAmount: z.number().int(),
  time: z.string().date(),
  owner: z.object({
    connect: z.object({
      id: z.string().cuid(),
    }),
  }),
});

export type BidCreateProps = z.infer<typeof BidCreateProps>;

export const BidUpdateProps = z.object({
  bidAmount: z.number().int().optional(),
  time: z.string().date().optional(),
});

export type BidUpdateProps = z.infer<typeof BidUpdateProps>;
