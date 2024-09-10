/*
  Warnings:

  - The `progress` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('ToDo', 'InProgress', 'Done');

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "content" DROP NOT NULL,
DROP COLUMN "progress",
ADD COLUMN     "progress" "Progress" NOT NULL DEFAULT 'ToDo';
