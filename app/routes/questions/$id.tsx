import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { formatDistanceToNow } from "date-fns";
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
    <div className="flex-1">
      <article className="px-4 py-5 bg-white rounded-md">
        <header className="">
          <h1 className="text-2xl font-bold">{question?.title}</h1>
          <p>{question?.body}</p>
        </header>
        <div className="flex items-center mt-12 text-gray-500">
          <img
            src={question?.author?.photo}
            alt={`${question?.author?.first_name}'s profile photo`}
            className="w-10 h-10 ml-auto mr-2 border border-gray-200 rounded-full"
          />
          <div className="text-sm">
            <p>{question?.author?.first_name}</p>
            <time dateTime={new Date(question?.created_at).toISOString()}>
              {formatDistanceToNow(new Date(question?.created_at), {
                addSuffix: true,
              })}
            </time>
          </div>
        </div>
      </article>
    </div>
  );
}
