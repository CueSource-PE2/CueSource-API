import * as z from "zod";

export const UserCreateProps = z.object({
  authId: z.string(),
  name: z.string(),
  bio: z.string().optional(),
  email: z.string().email(),
  image: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  twitter: z.string().url().optional(),
  Tags: z.array(z.string()).optional(),
});

export type UserCreateProps = z.infer<typeof UserCreateProps>;

export const UserUpdateProps = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  twitter: z.string().url().optional(),
  Tags: z.array(z.string()).optional(),
});

export type UserUpdateProps = z.infer<typeof UserUpdateProps>;
