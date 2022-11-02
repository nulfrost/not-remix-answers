import { Question } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { superjson, useSuperLoaderData } from "~/utils/data";
import { getQuestions } from "~/models/question.server";
import { Link } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const category = params.category as string;

  const questions = await getQuestions(category);

  return superjson({ questions });
}

export default function Index() {
  const { questions } = useSuperLoaderData<typeof loader>();

  return (
    <section className="bg-gray-100">
      <div>
        {questions.map((question) => (
          <Question key={question.id} {...question} />
        ))}
      </div>
    </section>
  );
}

type QuestionProps = Exclude<Question, "created_at" | "updated_at"> & {
  category: { name: string } | null;
} & { author?: { first_name?: string } | null } & {
  _count: { comment: number };
};

function Question(props: QuestionProps) {
  return (
    <article className="px-4 py-3 bg-white border border-gray-200 first:rounded-t-md last:rounded-b-md">
      <h2 className="mb-2 text-lg font-bold">
        <Link to={`/questions/${props.id}`} className="hover:underline">
          {props.title}
        </Link>
      </h2>
      <p className="mb-3 text-sm line-clamp-3">{props.body}</p>
      <footer className="text-sm">
        <span className="block text-gray-500">
          Posted by {props.author?.first_name} on{" "}
          <time
            dateTime={
              new Date(props.created_at).toISOString() as unknown as string
            }
          >
            {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
              new Date(props.created_at)
            )}
          </time>
        </span>
      </footer>
    </article>
  );
}
