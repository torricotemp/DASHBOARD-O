import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const VotoPorUsuario = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const votos = await prisma.registro_votos.groupBy({
      by: ["id_dispositivo"],
      _count: {
        id: true,
      },
    });

    res.status(200).json({
      message: "Votos agrupados por dispositivo",
      data: votos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los votos" });
  }
};
export const reportePorCuenta = async (req: Request, res: Response) => {
  try {
    const rawData = await prisma.registro_votos.groupBy({
      by: ["id_dispositivo"],
      _count: { id: true },
    });

    const data = rawData
      .filter((row) => row.id_dispositivo !== null) // Opcional
      .map((row) => ({
        id_dispositivo: row.id_dispositivo,
        conteo: row._count.id,
      }));

    res.status(200).json({ message: "Llenado por cuenta", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error al generar el reporte por cuenta",
    });
  }
};

export const reporteTotal = async (req: Request, res: Response) => {
  try {
    const total = await prisma.registro_votos.count();
    res.status(200).json({ message: "Total de registros", total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al contar registros" });
  }
};
export const reporteTotalPorCiudad = async (req: Request, res: Response) => {
  try {
    const rawData = await prisma.registro_votos.groupBy({
      by: ["ciudad"],
      _count: { id: true },
    });

    const data = rawData
      .filter((row) => row.ciudad !== null) // Opcional: omite ciudades nulas
      .map((row) => ({
        ciudad: row.ciudad,
        conteo: row._count.id,
      }));

    res.status(200).json({ message: "Totales por ciudad", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al generar reporte por ciudad" });
  }
};

export const reportePorMetodo = async (req: Request, res: Response) => {
  try {
    const rawData = await prisma.registro_votos.groupBy({
      by: ["metodo"],
      _count: { id: true },
    });

    const data = rawData
      .filter((row) => row.metodo !== null)
      .map((row) => ({
        metodo: row.metodo,
        conteo: row._count.id,
      }));

    res.status(200).json({ message: "Llenado por método", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al generar reporte por método" });
  }
};

export const reportePorMetodoCuenta = async (req: Request, res: Response) => {
  try {
    // Paso 1: Agrupación por id_dispositivo y metodo
    const groupedData = await prisma.registro_votos.groupBy({
      by: ["id_dispositivo", "metodo"],
      _count: { id: true },
    });

    // Paso 2: Transformación a estructura anidada
    const result: Record<
      string,
      {
        id_dispositivo: string;
        metodos: { metodo: string | null; conteo: number }[];
      }
    > = {};

    for (const row of groupedData) {
      const { id_dispositivo, metodo, _count } = row;

      if (!id_dispositivo) continue;

      if (!result[id_dispositivo]) {
        result[id_dispositivo] = {
          id_dispositivo,
          metodos: [],
        };
      }

      result[id_dispositivo].metodos.push({
        metodo,
        conteo: _count.id,
      });
    }

    res.status(200).json({
      message: "Llenado por método y cuenta",
      data: Object.values(result),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error al generar reporte por método/cuenta",
    });
  }
};

export const reportePorCiudadCuenta = async (req: Request, res: Response) => {
  try {
    const groupedData = await prisma.registro_votos.groupBy({
      by: ["id_dispositivo", "ciudad"],
      _count: { id: true },
    });

    const result: Record<
      string,
      {
        id_dispositivo: string;
        ciudades: { ciudad: string | null; conteo: number }[];
      }
    > = {};

    for (const row of groupedData) {
      const { id_dispositivo, ciudad, _count } = row;

      if (!id_dispositivo) continue;

      if (!result[id_dispositivo]) {
        result[id_dispositivo] = {
          id_dispositivo,
          ciudades: [],
        };
      }

      result[id_dispositivo].ciudades.push({
        ciudad,
        conteo: _count.id,
      });
    }

    res.status(200).json({
      message: "Llenado por ciudad y cuenta",
      data: Object.values(result),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error al generar reporte por ciudad/cuenta",
    });
  }
};

export const ReportesController = {
  reportePorCuenta,
  reporteTotal,
  reporteTotalPorCiudad,
  reportePorMetodo,
  reportePorMetodoCuenta,
  reportePorCiudadCuenta,
};
