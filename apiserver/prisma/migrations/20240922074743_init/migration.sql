-- CreateTable
CREATE TABLE "SubReddit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bannerImageUrl" TEXT,
    "iconImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "SubReddit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imagesUrl" TEXT[],
    "videosUrl" TEXT[],
    "authorId" TEXT NOT NULL,
    "subredditId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubRedditToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubReddit_name_key" ON "SubReddit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SubRedditToUser_AB_unique" ON "_SubRedditToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SubRedditToUser_B_index" ON "_SubRedditToUser"("B");

-- AddForeignKey
ALTER TABLE "SubReddit" ADD CONSTRAINT "SubReddit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subredditId_fkey" FOREIGN KEY ("subredditId") REFERENCES "SubReddit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubRedditToUser" ADD CONSTRAINT "_SubRedditToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SubReddit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubRedditToUser" ADD CONSTRAINT "_SubRedditToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
