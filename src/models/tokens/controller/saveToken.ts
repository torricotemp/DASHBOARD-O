import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const GuardadoToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { tokens } = req.body;

    if (!Array.isArray(tokens)) {
      res.status(400).json({
        msg: "El formato debe ser un array de tokens",
      });
      return;
    }

    const tokensData = tokens.map((tokenObj) => ({
      token: tokenObj.token,
      numero: tokenObj.numero,
      dominio: tokenObj.dominio,
      estado: true,
    }));

    const resultado = await prisma.token.createMany({
      data: tokensData,
    });

    res.status(200).json({
      msg: `Se almacenaron ${resultado.count} tokens correctamente`,
      tokens_guardados: resultado.count,
    });
  } catch (error) {
    console.error("Error al guardar tokens:", error);
    res.status(500).json({
      msg: "Error interno al procesar los tokens",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  } finally {
    await prisma.$disconnect();
  }
};
