-- CreateTable
CREATE TABLE `TableCustomFields` (
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `columnName` VARCHAR(191) NOT NULL,
    `columnType` VARCHAR(191) NOT NULL,
    `customFieldValue` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TableCustomFields` ADD CONSTRAINT `TableCustomFields_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
