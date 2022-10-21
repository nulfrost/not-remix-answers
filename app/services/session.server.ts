import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(
  process.env.SESSION_SECRET,
  "Please add a session secret to your .env file!"
);

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
