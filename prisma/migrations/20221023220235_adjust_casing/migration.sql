/*
  Warnings:

  - You are about to drop the column `userEmail` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userEmail_fkey";

-- DropIndex
DROP INDEX "profile_userEmail_key";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "userEmail",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_email_key" ON "profile"("user_email");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE CASCADE;
