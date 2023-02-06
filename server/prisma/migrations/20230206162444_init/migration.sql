-- DropForeignKey
ALTER TABLE `InvitedUser` DROP FOREIGN KEY `InvitedUser_projectId_fkey`;

-- AlterTable
ALTER TABLE `InvitedUser` MODIFY `projectId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `InvitedUser` ADD CONSTRAINT `InvitedUser_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
