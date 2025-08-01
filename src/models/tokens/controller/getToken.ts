import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { generarTokenManual } from "../../../infraestructura/generate";

const prisma = new PrismaClient();

export const GetToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { IP, MASIVO, MIXTO } = req.query;
    const isMasivo = MASIVO === "true";
    const isMixto = MIXTO === "true";

    const tokensDisponibles = await prisma.token.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        token: true,
        numero: true,
      },
    });

    if ((isMasivo || isMixto) && tokensDisponibles.length < 20) {
      res.status(400).json({
        msg: "No hay tokens suficientes disponibles para operación masiva/mixta. Se requieren al menos 20 tokens.",
      });
      return;
    }

    if (tokensDisponibles.length === 0) {
      res.status(404).json({
        msg: "No se encontraron tokens disponibles",
      });
      return;
    }
    const tokenATomar = tokensDisponibles[0];

    const dataConNumeroSeguro = {
      ...tokenATomar,
      numero: tokenATomar.numero ?? "",
    };

    res.status(200).json({
      msg: "Token obtenido exitosamente",
      data: {
        id: "cmdteza2w740flh042bl8y3p2",
        token:
          ".eJwVyUsOwiAQANC7zFZLYdHvbaZAyyQyY2Cwpsa7G9_2fYBbjkVghduwODsu82TdNMMdgmRi-k9Sfda171-i6EnYUwsYkLHDMw2HTyUw2j0fb7MVvOhRpWnqrDN4tRLPuFXSWA1Hhe8PWLMnnA.aI05XA.y1Z-ZVdqBAWI-znAtPJVzqivJGQ",
        numero: "+591069870178",
      },
    });
  } catch (error) {
    console.error("Error al procesar tokens:", error);
    res.status(500).json({
      msg: "Error interno al procesar los tokens",
    });
  }
};
