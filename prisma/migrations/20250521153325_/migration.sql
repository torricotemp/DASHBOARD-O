/*
  Warnings:

  - You are about to drop the `PreEnvio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Proxy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Simulacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Solicitudes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Validado` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "metodo" AS ENUM ('TUXLER', 'MODO_AVION');

-- CreateEnum
CREATE TYPE "tipo" AS ENUM ('PRE_ENVIO', 'VOTO_TOKEN', 'VOTO_GERACION_TOKEN_ALEATORIA', 'SIMULACION');

-- DropForeignKey
ALTER TABLE "Solicitudes" DROP CONSTRAINT "Solicitudes_proxyId_fkey";

-- DropTable
DROP TABLE "PreEnvio";

-- DropTable
DROP TABLE "Proxy";

-- DropTable
DROP TABLE "Simulacion";

-- DropTable
DROP TABLE "Solicitudes";

-- DropTable
DROP TABLE "Validado";

-- CreateTable
CREATE TABLE "registro_votos" (
    "id" TEXT NOT NULL,
    "timestamp" TEXT,
    "ip_publica" TEXT,
    "id_public_user" TEXT,
    "numero" TEXT,
    "latitud" TEXT,
    "longitud" TEXT,
    "ci" TEXT,
    "dia_nacimiento" TEXT,
    "mes_nacimiento" TEXT,
    "anio_nacimiento" TEXT,
    "pais" TEXT,
    "ciudad" TEXT,
    "candidato" TEXT,
    "tipo" "tipo" NOT NULL,
    "token_solicutd" TEXT,
    "codigo_respuesta" TEXT,
    "respuesta" TEXT,
    "id_dispositivo" TEXT,
    "metodo" "metodo" NOT NULL,
    "refer_envio" TEXT,
    "token_refer" TEXT,

    CONSTRAINT "registro_votos_pkey" PRIMARY KEY ("id")
);
