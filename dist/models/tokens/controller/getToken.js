"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetToken = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const GetToken = async (req, res) => {
    try {
        const { MASIVO, MIXTO } = req.query;
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
        // ❗ Introducir probabilidad de NO entregar token (ej. 20%)
        const shouldReturnToken = Math.random() > 0.6; // 80% chance de sí entregar
        if (!shouldReturnToken) {
            res.status(403).json({
                msg: "No se puede obtener un token en este momento. Intente nuevamente.",
            });
            return;
        }
        const randomIndex = Math.floor(Math.random() * tokensDisponibles.length);
        const tokenAleatorio = tokensDisponibles[randomIndex];
        const dataConNumeroSeguro = {
            ...tokenAleatorio,
            numero: tokenAleatorio.numero ?? "",
        };
        res.status(200).json({
            msg: "Token obtenido exitosamente",
            data: dataConNumeroSeguro,
        });
    }
    catch (error) {
        console.error("Error al procesar tokens:", error);
        res.status(500).json({
            msg: "Error interno al procesar los tokens",
        });
    }
};
exports.GetToken = GetToken;
