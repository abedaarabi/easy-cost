/*
  Warnings:

  - A unique constraint covering the columns `[columnName,projectId]` on the table `TableCustomFields` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TableCustomFields_columnName_projectId_key` ON `TableCustomFields`(`columnName`, `projectId`);
