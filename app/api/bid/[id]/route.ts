import services from "@/services";
import { BidContext } from "./types";
import { QuestUpdateProps } from "@/utils/validators/questValidators";
import { BidUpdateProps } from "@/utils/validators/bidValidators";

export async function GET(req: Request, ctx: BidContext) {
  try {
    const parsedBidContext = BidContext.safeParse(ctx);

    if (!parsedBidContext.success) {
      return new Response(JSON.stringify({ error: parsedBidContext.error }), {
        status: 400,
      });
    }

    const { id } = parsedBidContext.data.params;

    const [success, bid] = await services.bid.findOne({ id });

    if (!success) {
      return new Response(JSON.stringify({ error: bid }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ quest: bid }), { status: 200 });
  } catch (error) {
    console.log("Error in GET /api/bid: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request, ctx: BidContext) {
  try {
    const parsedBidContext = BidContext.safeParse(ctx);

    if (!parsedBidContext.success) {
      return new Response(JSON.stringify({ error: parsedBidContext.error }), {
        status: 400,
      });
    }

    const { id } = parsedBidContext.data.params;

    const parsedBody = BidUpdateProps.safeParse(await req.json());

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: parsedBody.error }), {
        status: 400,
      });
    }

    const [success, bid] = await services.bid.update({ id }, parsedBody.data);

    if (!success) {
      return new Response(JSON.stringify({ error: bid }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: bid }), { status: 200 });
  } catch (error) {
    console.log("Error in PUT /api/quest: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request, ctx: BidContext) {
  try {
    const parsedBidContext = BidContext.safeParse(ctx);

    if (!parsedBidContext.success) {
      return new Response(JSON.stringify({ error: parsedBidContext.error }), {
        status: 400,
      });
    }

    const { id } = parsedBidContext.data.params;

    const [success, bid] = await services.bid.deleteOne({ id });

    if (!success) {
      return new Response(JSON.stringify({ error: bid }), { status: 500 });
    }

    return new Response(JSON.stringify({ user: bid }), { status: 200 });
  } catch (error) {
    console.log("Error in DELETE /api/quest: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
