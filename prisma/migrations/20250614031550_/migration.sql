/*
  Warnings:

  - The values [EXCELLENT] on the enum `donations_condition` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `donations` MODIFY `imageUrl` TEXT NOT NULL,
    MODIFY `condition` ENUM('GOOD', 'FAIR', 'POOR') NOT NULL,
    MODIFY `address` TEXT NULL;
