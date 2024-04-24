import { Prisma } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export async function create(data: Prisma.QuestCreateInput) {
  try {
    const quest = await prisma.quest.create({ data });

    if (!quest) {
      return [
        false,
        new Error("There was some error creating an entry in the database."),
      ];
    }

    return [true, { data: quest }];
  } catch (error) {
    return [false, new Error("Error 500 internal server error.")];
  }
}

export async function findOne(where: Prisma.QuestWhereInput) {
  try {
    const quest = await prisma.quest.findFirst({
      where: where,
    });

    if (!quest) {
      return [
        false,
        new Error("There was some error finding the entry from the database"),
      ];
    }

    return [true, { data: quest }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function findMany(where?: Prisma.QuestWhereInput) {
  try {
    const quest = await prisma.quest.findMany({
      where: where,
    });

    if (!quest) {
      return [
        false,
        new Error("There was some error finding the entries from the database"),
      ];
    }

    return [true, { data: quest }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}

export async function deleteOne(where: Prisma.QuestWhereUniqueInput) {
  try {
    const quest = await prisma.quest.delete({
      where: where,
    });

    if (!quest) {
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

export async function deleteMany(where: Prisma.QuestWhereInput) {
  try {
    const quest = await prisma.quest.deleteMany({
      where: where,
    });

    if (!quest) {
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
  where: Prisma.QuestWhereUniqueInput,
  data: Prisma.QuestUpdateInput
) {
  try {
    const quest = await prisma.quest.update({
      where: where,
      data: data,
    });

    if (!quest) {
      return [
        false,
        new Error("There was some error updating the entry in the database"),
      ];
    }

    return [true, { data: quest }];
  } catch (error) {
    return [false, new Error("Error 500 Internal Server Error")];
  }
}
