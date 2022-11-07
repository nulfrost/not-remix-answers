import { Link } from "@remix-run/react";
import { Question } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Like } from "~/routes/resources/like";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

type QuestionProps = Exclude<Question, "created_at" | "updated_at"> & {
  category: { name: string } | null;
} & { author?: { first_name?: string } | null } & {
  _count: { comments: number; questionLikes: number };
};

export function QuestionCard(props: QuestionProps) {
  return (
    <article className="flex items-center gap-4 px-4 py-3 bg-white border border-gray-200 first:rounded-t-md last:rounded-b-md">
      {/* <div className="text-center">
        <Like _count={props._count} question_id={props.id} />
      </div> */}
      <div className="flex-1">
        <div className="flex">
          <h2 className="mb-2 text-lg font-bold">
            <Link to={`/questions/${props.id}`} className="hover:underline">
              {props.title}
            </Link>
          </h2>
          <EllipsisVerticalIcon className="w-5 h-5 ml-auto fill-gray-500" />
        </div>
        <p className="mb-3 text-sm line-clamp-3">{props.body}</p>
        <footer className="text-sm text-gray-500">
          <span>{props?._count?.comments} answers</span> &middot;{" "}
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
            {formatDistanceToNow(new Date(props.created_at), {
              addSuffix: true,
            })}
          </time>
        </footer>
      </div>
    </article>
  );
}
