import { HeartIcon } from "@heroicons/react/24/outline";
import { ActionArgs, json } from "@remix-run/node";
import { Form, useFetcher } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { redirect } from "~/utils/data";

type LikeButtonProps = {
  _count: {
    questionLikes: number;
  };
  question_id: string;
};

export async function action({ request }: ActionArgs) {
  const user = authenticator.isAuthenticated(request);
  if (!user) return redirect("/login");

  console.log(request.method);

  switch (request.method) {
    case "post":
      const formData = await request.formData();

      console.log(formData);
    default:
      return json({});
  }
}

export function Like(props: LikeButtonProps) {
  let fetcher = useFetcher();

  return (
    <div className="flex flex-col">
      <button
        type="submit"
        onClick={() =>
          fetcher.submit({ method: "post", action: "/resources/like" })
        }
      >
        <HeartIcon className="w-5 h-5 fill-red-600" />
      </button>

      <small className="font-bold">{props?._count?.questionLikes}</small>
    </div>
  );
}
