/*
  Warnings:

  - You are about to alter the column `profit` on the `ProjecMaterial` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ProjecMaterial` MODIFY `profit` DOUBLE NOT NULL DEFAULT 3.9;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
