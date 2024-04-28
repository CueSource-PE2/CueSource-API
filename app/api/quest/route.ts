import services from "@/services";
import { QuestCreateProps } from "@/utils/validators/questValidators";

export async function POST(req: Request) {
  try {
    const parsedBody = QuestCreateProps.safeParse(await req.json());

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: parsedBody.error }), {
        status: 400,
      });
    }

    const [success, bid] = await services.quest.create(parsedBody.data);

    if (!success) {
      return new Response(JSON.stringify({ error: bid }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: bid }), { status: 201 });
  } catch (error) {
    console.log("Error in POST /api/quest: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const [success, quests] = await services.quest.findMany();

    if (!success) {
      return new Response(JSON.stringify({ error: quests }), { status: 500 });
    }

    return new Response(JSON.stringify({ quests }), { status: 200 });
  } catch (error) {
    console.log("Error in GET /api/quest: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
