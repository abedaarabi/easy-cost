-- DropForeignKey
ALTER TABLE `TableCustomFields` DROP FOREIGN KEY `TableCustomFields_projectId_fkey`;

-- AlterTable
ALTER TABLE `TableCustomFields` MODIFY `projectId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `TableCustomFields` ADD CONSTRAINT `TableCustomFields_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
