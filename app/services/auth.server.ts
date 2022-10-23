import type { Profile } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { GitHubStrategy, SocialsProvider } from "remix-auth-socials";
import invariant from "tiny-invariant";
import { createOrReturnUser } from "~/models/user.server";
import { sessionStorage } from "~/services/session.server";

invariant(
  process.env.GITHUB_CLIENT_ID,
  "Please generate and add your github client ID to your .env file"
);
invariant(
  process.env.GITHUB_CLIENT_SECRET,
  "Please generate and add your github secret to your .env file"
);

export let authenticator = new Authenticator<Partial<Profile>>(sessionStorage);

authenticator.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/${SocialsProvider.GITHUB}/callback`,
    },
    async ({ profile }) => {
      const user = await createOrReturnUser(profile);

      return user;
    }
  )
);
