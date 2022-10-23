import { GitHubProfile } from "remix-auth-socials";
import prisma from "~/db.server";
import primsa from "~/db.server";

export async function createOrUpdateUser(profile: GitHubProfile) {
  // is this email already registered?
  const user = await primsa.user.findFirst({
    where: {
      email: profile?.emails[0].value,
    },
    include: {
      profile: {
        select: {
          connected_account: true,
          first_name: true,
          is_verified: true,
          photo: true,
          userEmail: true,
        },
      },
    },
  });

  if (!user) {
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

  return user;
}
