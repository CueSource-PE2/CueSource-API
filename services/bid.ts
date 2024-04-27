import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export async function create(data: Prisma.BidCreateInput) {
  try {
    const bid = await prisma.bid.create({ data });

    if (!bid) {
      return [
        false,
        new Error("There was some error creating an entry in the database."),
      ];
    }

    return [true, { data: bid }];
  } catch (error) {
    return [false, new Error("Error 500 internal server error.")];
  }
}

export async function findOne(where: Prisma.BidWhereInput) {
  try {
    const bid = await prisma.bid.findFirst({
      where: where,
      select: {
        id: true,
        bidAmount: true,
        Quest: true,
        questId: true,
        time: true,
        owner: true,
        ownerId: true,
        upadtedAt: true,
        createdAt: true,
      },
    });

    if (!bid) {
      return [
        false,
        new Error("There was some error finding the entry from the database"),
      ];
    }

    return [true, { data: bid }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function findMany(where?: Prisma.BidWhereInput) {
  try {
    const bid = await prisma.bid.findMany({
      where: where,
      select: {
        id: true,
        bidAmount: true,
        Quest: true,
        questId: true,
        time: true,
        owner: true,
        ownerId: true,
        upadtedAt: true,
        createdAt: true,
      },
    });

    if (!bid) {
      return [
        false,
        new Error("There was some error finding the entries from the database"),
      ];
    }

    return [true, { data: bid }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function deleteOne(where: Prisma.BidWhereUniqueInput) {
  try {
    const bid = await prisma.bid.delete({
      where: where,
    });

    if (!bid) {
      return [
        false,
        new Error("There was some error deleting the entry from the database"),
      ];
    }

    return [true, { data: "Deleted" }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function deleteMany(where: Prisma.BidWhereInput) {
  try {
    const bid = await prisma.bid.deleteMany({
      where: where,
    });

    if (!bid) {
      return [
        false,
        new Error(
          "There was some error deleting the entries from the database"
        ),
      ];
    }

    return [true, { data: "Deleted" }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function update(
  where: Prisma.BidWhereUniqueInput,
  data: Prisma.BidUpdateInput
) {
  try {
    const bid = await prisma.bid.update({
      where: where,
      data: data,
    });

    if (!bid) {
      return [
        false,
        new Error("There was some error updating the entry in the database"),
      ];
    }

    return [true, { data: bid }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}
