import { Category, Question } from "@prisma/client";
import invariant from "tiny-invariant";
import prisma from "~/db.server";

export async function createQuestion(
  question: Pick<Question, "title" | "body" | "profile_id"> & {
    category: Category["name"];
  }
) {
  invariant(question.profile_id, "There was an error creating the question");
  return prisma.question.create({
    data: {
      title: question.title,
      body: question.body,
      category: {
        connect: {
          name: question.category,
        },
      },
      author: {
        connect: {
          id: question.profile_id,
        },
      },
    },
  });
}
