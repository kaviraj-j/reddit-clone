/*
  Warnings:

  - You are about to drop the `_SubRedditToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SubRedditToUser" DROP CONSTRAINT "_SubRedditToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubRedditToUser" DROP CONSTRAINT "_SubRedditToUser_B_fkey";

-- DropTable
DROP TABLE "_SubRedditToUser";

-- CreateTable
CREATE TABLE "_FollwedBySubreddits" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollwedBySubreddits_AB_unique" ON "_FollwedBySubreddits"("A", "B");

-- CreateIndex
CREATE INDEX "_FollwedBySubreddits_B_index" ON "_FollwedBySubreddits"("B");

-- AddForeignKey
ALTER TABLE "_FollwedBySubreddits" ADD CONSTRAINT "_FollwedBySubreddits_A_fkey" FOREIGN KEY ("A") REFERENCES "SubReddit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollwedBySubreddits" ADD CONSTRAINT "_FollwedBySubreddits_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
