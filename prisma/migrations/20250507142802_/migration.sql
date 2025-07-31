-- CreateTable
CREATE TABLE "PreEnvio" (
    "id" TEXT NOT NULL,
    "timestamp" TEXT,
    "ip_actual" TEXT,
    "latitud" TEXT,
    "longitud" TEXT,
    "pais" TEXT,
    "ciudad" TEXT,
    "candidato" TEXT,

    CONSTRAINT "PreEnvio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Validado" (
    "id" TEXT NOT NULL,
    "timestamp" TEXT,
    "ip_publica" TEXT,
    "latitud" TEXT,
    "longitud" TEXT,
    "pais" TEXT,
    "ciudad" TEXT,
    "candidato" TEXT,
    "codigo_respuesta" TEXT,
    "texto_respuesta" TEXT,

    CONSTRAINT "Validado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simulacion" (
    "id" TEXT NOT NULL,
    "latitud" TEXT,
    "longitud" TEXT,
    "pais" TEXT,
    "ciudad" TEXT,
    "candidato" TEXT,
    "ip_publica_user" TEXT,

    CONSTRAINT "Simulacion_pkey" PRIMARY KEY ("id")
);
