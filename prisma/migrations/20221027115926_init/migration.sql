/*
  Warnings:

  - The values [comapanyAdmin] on the enum `User_userType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `userType` ENUM('CompanyUser', 'Client', 'CompanyAdmin') NOT NULL;
