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

type QuestionInput = Category["name"];

export async function getQuestions(category?: QuestionInput) {
  return prisma.question.findMany({
    where: {
      category: {
        name: category,
      },
    },
    include: {
      author: {
        select: {
          first_name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
          questionLikes: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function getSingleQuestion(id: Question["id"]) {
  return prisma.question.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      body: true,
      comments: true,
      created_at: true,
      author: {
        select: {
          photo: true,
          first_name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });
}
