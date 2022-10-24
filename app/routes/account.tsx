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
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
