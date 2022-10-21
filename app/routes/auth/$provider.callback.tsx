import { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ request, params }: LoaderArgs) {
  if (params.provider) {
    return await authenticator.authenticate(params.provider, request, {
      successRedirect: "/",
      failureRedirect: "/",
    });
  }
}
