import { Question } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { superjson, useSuperLoaderData } from "~/utils/data";
import { getQuestions } from "~/models/question.server";
import { Link } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") as string;

  const questions = await getQuestions({ category });

  return superjson({ questions });
}

export default function Index() {
  const { questions } = useSuperLoaderData<typeof loader>();

  return (
    <section className="bg-gray-100 ">
      <h1 className="text-3xl font-bold text-right">All Categories</h1>
      <div className="grid grid-cols-2">
        {questions.map((question) => (
          <Question {...question} />
        ))}
      </div>
    </section>
  );
}

type QuestionProps = Exclude<Question, "created_at" | "updated_at"> & {
  category: { name: string };
} & { author?: { first_name?: string } };

function Question(props: QuestionProps) {
  return (
    <article className="px-4 py-3 bg-white border border-gray-200 rounded-md">
      <h2 className="mb-2 text-lg font-bold">
        <Link to={`/question/${props.id}`} className="hover:underline">
          {props.title}
        </Link>
      </h2>
      <p className="mb-3 text-sm line-clamp-3">{props.body}</p>
      <footer className="text-sm">
        <span className="block text-right text-gray-500">
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
