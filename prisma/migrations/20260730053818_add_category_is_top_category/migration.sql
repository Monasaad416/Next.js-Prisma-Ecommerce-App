/*
  Warnings:

  - You are about to drop the column `is_top_cat` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "is_top_cat",
ADD COLUMN     "isTopCategory" BOOLEAN NOT NULL DEFAULT false;
