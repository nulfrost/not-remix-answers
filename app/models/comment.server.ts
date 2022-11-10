import { Profile, Question } from "@prisma/client";
import prisma from "~/db.server";

type CreateCommentArgs = {
  question_id: Question["id"];
  profile_id: Profile["id"];
  body: string;
};

export async function createComment({
  question_id,
  profile_id,
  body,
}: CreateCommentArgs) {
  return prisma.comment.create({
    data: {
      body,
      author: {
        connect: {
          id: profile_id,
        },
      },
      question: {
        connect: {
          id: question_id,
        },
      },
    },
  });
}
