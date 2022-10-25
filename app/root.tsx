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
import { Navbar, Sidebar } from "~/components/global";
import { authenticator } from "./services/auth.server";
import { superjson, useSuperLoaderData } from "~/utils/data";
import { getCategories } from "./models/category.server";

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
  let [user, categories] = await Promise.all([
    authenticator.isAuthenticated(request),
    getCategories(),
  ]);

  return superjson({ user, categories });
}
export default function App() {
  const { user, categories } = useSuperLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-full">
        <Navbar user={user} />
        <main className="flex flex-1 w-full px-5 mx-auto max-w-7xl">
          <Sidebar categories={categories} />
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
