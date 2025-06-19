-- AlterTable
ALTER TABLE `users` ADD COLUMN `password` VARCHAR(191) NULL,
    MODIFY `supabaseId` VARCHAR(191) NULL;
