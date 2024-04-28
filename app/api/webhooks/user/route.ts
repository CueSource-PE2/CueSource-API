import { prisma } from "@/utils/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, first_name, last_name, email_addresses, external_accounts } =
      evt.data;

    const extacc =
      Array.isArray(external_accounts) && external_accounts.length > 0
        ? external_accounts[0]
        : undefined;

    const email =
      Array.isArray(email_addresses) && email_addresses.length > 0
        ? email_addresses[0]
        : undefined;

    await prisma.user.upsert({
      where: { authId: id as string },
      create: {
        authId: id as string,
        name: `${first_name} ${last_name}`,
        email: email.email_address as string,
        image: extacc.avatar_url as string,
        github: `https://www.github.com/${extacc.username}`,
      },
      update: {
        name: `${first_name} ${last_name}` as string,
        email: email.email_address as string,
        image: extacc.avatar_url as string,
        github: `https://www.github.com/${extacc.username}`,
      },
    });
  }
}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
