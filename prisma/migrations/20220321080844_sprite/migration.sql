/*
  Warnings:

  - You are about to drop the column `url` on the `Sprite` table. All the data in the column will be lost.
  - Added the required column `accessory` to the `Sprite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Sprite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eyes` to the `Sprite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hairstyle` to the `Sprite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main` to the `Sprite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outfit` to the `Sprite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sprite" DROP COLUMN "url",
ADD COLUMN     "accessory" TEXT NOT NULL,
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "eyes" TEXT NOT NULL,
ADD COLUMN     "hairstyle" TEXT NOT NULL,
ADD COLUMN     "main" TEXT NOT NULL,
ADD COLUMN     "outfit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT;
