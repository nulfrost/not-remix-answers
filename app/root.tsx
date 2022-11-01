import { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useParams,
} from "@remix-run/react";
import tailwindCSS from "~/styles/tailwind.css";
import { Navbar, Sidebar } from "~/components/global";
import { authenticator } from "./services/auth.server";
import { superjson, useSuperLoaderData } from "~/utils/data";
import { getCategories } from "./models/category.server";
import { Profile } from "@prisma/client";

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
    authenticator.isAuthenticated(request) as unknown as Profile,
    getCategories(),
  ]);

  return superjson({ user, categories });
}
export default function App() {
  const { user, categories } = useSuperLoaderData<typeof loader>();

  let excludeSidebarRoutes = [
    "/account",
    "/leaderboard",
    "/login",
    "/posts",
    "/posts/new",
  ];

  const location = useLocation();

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col flex-shrink h-full bg-gray-100">
        <Navbar user={user} />
        <main className="flex w-full mx-auto mt-4 bg-gray-100 max-w-7xl">
          {excludeSidebarRoutes.includes(location.pathname) ? null : (
            <Sidebar categories={categories} />
          )}
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
