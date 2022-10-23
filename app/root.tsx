import { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindCSS from "~/styles/tailwind.css";
import { Navbar } from "~/components/global";
import { authenticator } from "./services/auth.server";
import { Profile } from "@prisma/client";
import { superjson, useSuperLoaderData } from "~/utils/data";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: tailwindCSS,
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Not Remix Answers | Ask your wildest questions",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const user = (await authenticator.isAuthenticated(request)) as Profile;
  return superjson({ user });
}
export default function App() {
  const { user } = useSuperLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Navbar user={user} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
