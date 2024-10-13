import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const isUserFollowingSubreddit = async (
  userId: string,
  subredditId: string
) => {
  const userFollowsSubreddit = await prisma.user.findFirst({
    where: {
      id: userId,
      SubRedditsFollowed: {
        some: {
          id: subredditId,
        },
      },
    },
  });

  return !!userFollowsSubreddit;
};
