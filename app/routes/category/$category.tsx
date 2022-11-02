import { LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { QuestionCard } from "~/components/ui";
import { getQuestions } from "~/models/question.server";
import { superjson, useSuperLoaderData } from "~/utils/data";

export async function loader({ params }: LoaderArgs) {
  const questions = await getQuestions(params.category);
  if (!questions.length) {
    throw new Response("No questions", { status: 404 });
  }
  return superjson({ questions });
}

export default function Category() {
  const { questions } = useSuperLoaderData<typeof loader>();

  return (
    <section className="flex-1 bg-gray-100">
      <div>
        {questions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
    </section>
  );
}

export function CatchBoundary() {
  return (
    <div className="flex flex-col items-center flex-1">
      <h1 className="mb-4 text-xl font-bold">
        Hmm there doesn't seem to be anything here..
      </h1>
      <Link
        to="/questions/new"
        className="px-3 py-2 text-sm text-white duration-150 bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Post a question
      </Link>
    </div>
  );
}
