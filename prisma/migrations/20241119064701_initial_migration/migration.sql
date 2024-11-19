-- CreateTable
CREATE TABLE "shoes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageURL" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "shoes_pkey" PRIMARY KEY ("id")
);
