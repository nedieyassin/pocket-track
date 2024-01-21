/*
  Warnings:

  - You are about to drop the column `is_transfer` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `balance` on the `TransactionCategory` table. All the data in the column will be lost.
  - You are about to drop the column `external_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `date_created` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `date_updated` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `is_total` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `externalId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "is_transfer",
ADD COLUMN     "isTransfer" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TransactionCategory" DROP COLUMN "balance";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "external_id",
ADD COLUMN     "externalId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "date_created",
DROP COLUMN "date_updated",
DROP COLUMN "is_total",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "includeInTotal" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isTotal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
