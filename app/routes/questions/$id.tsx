import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getSingleQuestion } from "~/models/question.server";

export async function loader({ params }: LoaderArgs) {
  const questionId = params.id;
  invariant(questionId, "Invalid question ID");
  const question = await getSingleQuestion(questionId);

  if (!question) {
    throw new Response("Not found", { status: 404 });
  }

  return json({ question });
}

export default function Question() {
  const { question } = useLoaderData<typeof loader>();

  return (
    <div>
      <article>
        <h1>{question?.title}</h1>
        <p>{question?.body}</p>
        <div>
          <img
            src={question?.author?.photo}
            alt={`${question?.author?.first_name}'s profile photo`}
          />
          <p>{question?.author?.first_name}</p>
        </div>
      </article>
    </div>
  );
}
