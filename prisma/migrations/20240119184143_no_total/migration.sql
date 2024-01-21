/*
  Warnings:

  - You are about to drop the column `includeInTotal` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `isTotal` on the `Wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "includeInTotal",
DROP COLUMN "isTotal";
