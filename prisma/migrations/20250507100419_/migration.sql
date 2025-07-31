/*
  Warnings:

  - Added the required column `method` to the `Solicitudes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solicitudes" ADD COLUMN     "method" TEXT NOT NULL;
