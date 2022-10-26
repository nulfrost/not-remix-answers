import { json, LoaderArgs } from "@remix-run/node";
import { useUser } from "~/hooks";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return json({});
}

export default function Account() {
  const user = useUser();
  return (
    <section>
      <h1 className="text-3xl font-bold">Account</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </section>
  );
}
