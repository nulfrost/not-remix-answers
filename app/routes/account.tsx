import { json, LoaderArgs } from "@remix-run/node";
import { useUser } from "~/hooks";
import { authenticator } from "~/services/auth.server";
import { formatDistanceToNow } from "date-fns";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";

export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return json({});
}

export default function Account() {
  const user = useUser();
  return (
    <section className="w-1/2 px-2 xl:px-0">
      <h1 className="text-3xl font-bold">Account</h1>
      <div className="w-full px-5 py-2 mt-4 bg-white rounded-md shadow-md">
        <div className="pb-2 mb-2 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-sm text-gray-500">
            Information displayed here will be public.
          </p>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="relative">
            <img
              src={user?.photo}
              alt={`${user?.first_name}'s profile photo`}
              className="w-20 h-20 border-2 border-gray-300 rounded-full "
            />
            {user?.is_verified ? (
              <CheckBadgeIcon className="absolute right-0 w-5 h-5 bg-white rounded-full bottom-1 fill-blue-500" />
            ) : null}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold">{user?.first_name}</h3>
            <p className="text-sm text-gray-500">
              Joined on{" "}
              {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
                new Date(user?.created_at)
              )}{" "}
              (
              <time dateTime={user?.created_at}>
                {formatDistanceToNow(new Date(user?.created_at), {
                  addSuffix: true,
                })}
              </time>
              )
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
