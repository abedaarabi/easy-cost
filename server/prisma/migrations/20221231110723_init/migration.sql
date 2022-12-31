-- DropForeignKey
ALTER TABLE `projecmaterial` DROP FOREIGN KEY `ProjecMaterial_projectId_fkey`;

-- AlterTable
ALTER TABLE `projecmaterial` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `ProjecMaterial` ADD CONSTRAINT `ProjecMaterial_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
