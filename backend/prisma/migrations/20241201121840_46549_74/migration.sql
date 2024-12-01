/*
  Warnings:

  - Added the required column `signature` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "signature" TEXT NOT NULL;
