import { QuestStatus } from "@prisma/client";
import * as z from "zod";

export const QuestCreateProps = z.object({
  title: z.string(),
  description: z.string(),
  issueLink: z.string().url(),
  status: z.nativeEnum(QuestStatus),
  owner: z.object({
    connect: z.object({
      id: z.string().cuid(),
    }),
  }),
  price: z.number().int(),
  tags: z.array(z.string()).optional(),
});

export type QuestCreateProps = z.infer<typeof QuestCreateProps>;

export const QuestUpdateProps = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  issueLink: z.string().url().optional(),
  status: z.nativeEnum(QuestStatus).optional(),
  price: z.number().int().optional(),
  tags: z.array(z.string()).optional(),
});

export type QuestUpdateProps = z.infer<typeof QuestUpdateProps>;
