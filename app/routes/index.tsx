import { superjson, useSuperLoaderData } from "~/utils/data";
import { getQuestions } from "~/models/question.server";
import { QuestionCard } from "~/components/ui";
import { Link } from "@remix-run/react";

export async function loader() {
  const questions = await getQuestions();

  if (!questions.length) {
    throw new Response("No questions!", { status: 404 });
  }

  return superjson({ questions });
}

export default function Index() {
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
