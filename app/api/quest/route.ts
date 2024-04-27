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

    const [success, query] = await services.quest.create(parsedBody.data);

    if (!success) {
      return new Response(JSON.stringify({ error: query }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: query }), { status: 201 });
  } catch (error) {
    console.log("Error in POST /api/quest: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
