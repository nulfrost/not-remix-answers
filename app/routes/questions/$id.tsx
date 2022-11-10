import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useTransition,
  useActionData,
} from "@remix-run/react";
import { formatDistanceToNow } from "date-fns";
import invariant from "tiny-invariant";
import { useUser } from "~/hooks";
import { createComment } from "~/models/comment.server";
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

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();

  const question_id = params.id;
  const comment = formData.get("comment");
  const profile_id = formData.get("profile_id");

  if (!question_id || !comment || !profile_id) {
    throw new Response("There was an error creating the comment", {
      status: 400,
    });
  }

  const newComment = await createComment({
    profile_id,
    question_id,
    body: comment,
  });

  return json({ newComment });
}

export default function Question() {
  const { question } = useLoaderData<typeof loader>();

  const user = useUser();

  const navigate = useNavigate();

  const transition = useTransition();

  const busy = transition.state === "submitting";

  return (
    <div className="flex-1">
      <article className="px-4 py-5 mb-4 bg-white rounded-md">
        <header>
          <h1 className="text-2xl font-bold">{question?.title}</h1>
          <p>{question?.body}</p>
        </header>
        <div className="flex items-end mt-12 text-gray-500">
          {/* <small>
            Posted in{" "}
            <Link
              to={`/${question?.category?.name}`}
              className="text-blue-500 capitalize hover:text-blue-600 hover:underline"
            >
              {question?.category?.name}
            </Link>
          </small> */}
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
      <Form method="post" action="." className="flex flex-col gap-4">
        {/* Add some sort of redirect back to question page after logging in */}
        <label htmlFor="comment" className="sr-only">
          Post a comment
        </label>
        <textarea
          onClick={() => (!user ? navigate("/login") : null)}
          id="comment"
          placeholder="Leave a comment..."
          name="comment"
          className="block w-full overflow-auto border-gray-300 rounded-md shadow-sm resize-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={5}
        />
        {user ? (
          <>
            <input type="hidden" value={user?.id} name="profile_id" />
            <button
              disabled={busy}
              type="submit"
              className="self-start flex-shrink-0 w-1/6 px-3 py-2 ml-auto text-white duration-150 bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-400"
            >
              {busy ? "Posting comment.." : "Post Comment"}
            </button>
          </>
        ) : null}
      </Form>
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Comments</h2>
        <ul>
          {!question?.comments?.length ? (
            <p className="text-gray-500">
              There are no comments on this post, be the first!
            </p>
          ) : (
            question?.comments?.map((comment) => (
              <li
                key={comment?.id}
                className="px-3 py-4 bg-white border border-gray-200 shadow-sm xl:w-1/2 first:rounded-t-md last:rounded-b-md"
              >
                <article>
                  <h3 className="font-bold">{comment?.author?.first_name}</h3>
                  <p className="pb-4">{comment?.body}</p>
                  <footer className="flex justify-end pt-4 text-sm text-gray-500 border-t border-gray-200">
                    <p>
                      Posted{" "}
                      <time
                        dateTime={new Date(comment?.created_at).toISOString()}
                      >
                        {formatDistanceToNow(new Date(comment?.created_at), {
                          addSuffix: true,
                        })}
                      </time>
                    </p>
                  </footer>
                </article>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
