import { ActionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export function loader() {
  return redirect("/");
}

export async function action({ request, params }: ActionArgs) {
  if (params.provider) {
    return await authenticator.authenticate(params.provider, request);
  }
}
