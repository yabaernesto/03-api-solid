/*
  Warnings:

  - You are about to drop the column `password_has` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_has",
ADD COLUMN     "password_hash" TEXT;