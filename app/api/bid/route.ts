import services from "@/services";
import { BidCreateProps } from "@/utils/validators/bidValidators";

export async function POST(req: Request) {
  try {
    const parsedBody = BidCreateProps.safeParse(await req.json());

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: parsedBody.error }), {
        status: 400,
      });
    }

    const [success, query] = await services.bid.create(parsedBody.data);

    if (!success) {
      return new Response(JSON.stringify({ error: query }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: query }), { status: 201 });
  } catch (error) {
    console.log("Error in POST /api/bid: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
