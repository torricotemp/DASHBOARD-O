/*
  Warnings:

  - You are about to drop the column `ip_publica_user` on the `Simulacion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PreEnvio" ADD COLUMN     "id_public_user" TEXT;

-- AlterTable
ALTER TABLE "Simulacion" DROP COLUMN "ip_publica_user",
ADD COLUMN     "id_public_user" TEXT;

-- AlterTable
ALTER TABLE "Validado" ADD COLUMN     "id_public_user" TEXT;
