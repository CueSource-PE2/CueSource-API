import services from "@/services";
import { QuestContext } from "./types";
import { QuestUpdateProps } from "@/utils/validators/questValidators";

export async function GET(req: Request, ctx: QuestContext) {
  try {
    const parsedUserContext = QuestContext.safeParse(ctx);

    if (!parsedUserContext.success) {
      return new Response(JSON.stringify({ error: parsedUserContext.error }), {
        status: 400,
      });
    }

    const { id } = parsedUserContext.data.params;

    const [success, quest] = await services.quest.findOne({ id });

    if (!success) {
      return new Response(JSON.stringify({ error: quest }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ quest }), { status: 200 });
  } catch (error) {
    console.log("Error in GET /api/quest: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request, ctx: QuestContext) {
  try {
    const parsedUserContext = QuestContext.safeParse(ctx);

    if (!parsedUserContext.success) {
      return new Response(JSON.stringify({ error: parsedUserContext.error }), {
        status: 400,
      });
    }

    const { id } = parsedUserContext.data.params;

    const parsedBody = QuestUpdateProps.safeParse(await req.json());

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: parsedBody.error }), {
        status: 400,
      });
    }

    const [success, quest] = await services.quest.update(
      { id },
      parsedBody.data
    );

    if (!success) {
      return new Response(JSON.stringify({ error: quest }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: quest }), { status: 200 });
  } catch (error) {
    console.log("Error in PUT /api/quest: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request, ctx: QuestContext) {
  try {
    const parsedUserContext = QuestContext.safeParse(ctx);

    if (!parsedUserContext.success) {
      return new Response(JSON.stringify({ error: parsedUserContext.error }), {
        status: 400,
      });
    }

    const { id } = parsedUserContext.data.params;

    const [success, quest] = await services.quest.deleteOne({ id });

    if (!success) {
      return new Response(JSON.stringify({ error: quest }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: quest }), { status: 200 });
  } catch (error) {
    console.log("Error in DELETE /api/quest: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
