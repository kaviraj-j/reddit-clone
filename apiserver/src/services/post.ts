import { Post, PrismaClient, User, Vote, VoteType } from "@prisma/client";
const prisma = new PrismaClient();
const toggleVoteType = (vote: VoteType) => {
  if (vote === VoteType.DOWNVOTE) {
    return VoteType.UPVOTE;
  }
  return VoteType.DOWNVOTE;
};

export const createVote = async (
  existingVote: Vote | null,
  postId: string,
  userId: string,
  voteType: VoteType
) => {
  await prisma.vote.create({
    data: {
      postId,
      userId,
      voteType,
    },
  });
  if (existingVote && existingVote.voteType === toggleVoteType(voteType)) {
    // Increase and decrease votes

    if (voteType === VoteType.UPVOTE) {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          upvoteCount: {
            increment: 1,
          },
          downvoteCount: {
            decrement: 1,
          },
        },
      });
    } else {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          downvoteCount: {
            increment: 1,
          },
          upvoteCount: {
            decrement: 1,
          },
        },
      });
    }
  } else {
    // Only increase upvote or downvote count

    if (voteType === VoteType.UPVOTE) {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          upvoteCount: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          downvoteCount: {
            increment: 1,
          },
        },
      });
    }
  }
};
