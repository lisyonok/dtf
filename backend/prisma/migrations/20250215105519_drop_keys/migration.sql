/*
  Warnings:

  - You are about to drop the column `signature` on the `Drawing` table. All the data in the column will be lost.
  - You are about to drop the column `privateKey` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `publicKey` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drawing" DROP COLUMN "signature";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "privateKey",
DROP COLUMN "publicKey";
