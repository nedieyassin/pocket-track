-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "external_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
