import { User } from "@prisma/client";
import { useMatches } from "@remix-run/react";
import { GitHubProfile } from "remix-auth-socials";
import prisma from "~/db.server";

export async function createUser(profile: GitHubProfile) {
  return prisma.user.create({
    data: {
      email: profile?.emails[0].value,
      profile: {
        create: {
          first_name: profile?.name?.givenName.split(" ")[0],
          connected_account: profile?.provider,
          photo: profile?._json?.avatar_url,
        },
      },
    },
  });
}

export async function getUserProfile(email: User["email"]) {
  return prisma.profile.findUnique({
    where: {
      user_email: email,
    },
  });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: {
        select: {
          first_name: true,
          connected_account: true,
          is_verified: true,
          photo: true,
        },
      },
    },
  });
}
