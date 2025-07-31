"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preEnvio = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const preEnvio = async (req, res) => {
    const { body } = req;
    const ipPublica = req.headers["x-forwarded-for"] || req.ip;
    const register = await prisma.preEnvio.create({
        data: {
            ...body,
            id_public_user: ipPublica,
        },
    });
    if (!register) {
        res.status(400).json({
            msg: "No se pudo guardar",
        });
        return;
    }
    res.status(200).json({
        msg: "Guardado el preenvido",
    });
};
exports.preEnvio = preEnvio;
