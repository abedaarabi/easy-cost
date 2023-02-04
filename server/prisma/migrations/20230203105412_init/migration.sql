/*
  Warnings:

  - A unique constraint covering the columns `[email,companyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- DropIndex
DROP INDEX `User_name_key` ON `User`;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_companyId_key` ON `User`(`email`, `companyId`);
