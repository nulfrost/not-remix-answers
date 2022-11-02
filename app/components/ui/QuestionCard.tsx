import { Link } from "@remix-run/react";
import { Question } from "@prisma/client";

type QuestionProps = Exclude<Question, "created_at" | "updated_at"> & {
  category: { name: string } | null;
} & { author?: { first_name?: string } | null } & {
  _count: { comment: number };
};

export function QuestionCard(props: QuestionProps) {
  return (
    <article className="px-4 py-3 bg-white border border-gray-200 first:rounded-t-md last:rounded-b-md">
      <h2 className="mb-2 text-lg font-bold">
        <Link to={`/questions/${props.id}`} className="hover:underline">
          {props.title}
        </Link>
      </h2>
      <p className="mb-3 text-sm line-clamp-3">{props.body}</p>
      <footer className="text-sm text-gray-500">
        <span>{props?._count?.comment} answers</span> &middot;{" "}
        <Link
          to={`/category/${props.category?.name}`}
          className="text-blue-500 capitalize hover:text-blue-600 hover:underline"
        >
          {props.category?.name}
        </Link>{" "}
        &middot;{" "}
        <time
          dateTime={
            new Date(props.created_at).toISOString() as unknown as string
          }
        >
          {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
            new Date(props.created_at)
          )}
        </time>
      </footer>
    </article>
  );
}
