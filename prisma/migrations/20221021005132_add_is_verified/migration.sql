/*
  Warnings:

  - You are about to drop the column `points` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "points",
DROP COLUMN "verified",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;
