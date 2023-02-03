/*
  Warnings:

  - You are about to drop the column `remeberMeToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `remeberMeToken`,
    ADD COLUMN `rememberMeToken` VARCHAR(191) NULL;
