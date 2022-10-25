import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function action({ request }: ActionArgs) {
  await authenticator.logout(request, { redirectTo: "/" });
}

export async function loader({ request }: LoaderArgs) {
  return redirect("/");
}
