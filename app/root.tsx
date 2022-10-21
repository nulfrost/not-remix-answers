import { json, LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import tailwindCSS from "~/styles/tailwind.css";
import { Navbar } from "~/components/global";
import { authenticator } from "./services/auth.server";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: tailwindCSS,
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);
  console.log(user);
  return json(user);
}
export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
