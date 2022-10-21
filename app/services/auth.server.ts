import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import {
  GitHubProfile,
  GitHubStrategy,
  SocialsProvider,
} from "remix-auth-socials";
import invariant from "tiny-invariant";
import { Profile } from "@prisma/client";

invariant(
  process.env.GITHUB_CLIENT_ID,
  "Please generate and add your github client ID to your .env file"
);
invariant(
  process.env.GITHUB_CLIENT_SECRET,
  "Please generate and add your github secret to your .env file"
);

type User = GitHubProfile | Profile;

export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/${SocialsProvider.GITHUB}/callback`,
    },
    async ({ profile }) => {
      return profile;
    }
  )
);
