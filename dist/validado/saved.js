"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveValidado = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const saveValidado = async (req, res) => {
    const { body } = req;
    const ipPublica = req.socket.remoteAddress;
    const register = await prisma.validado.create({
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
        msg: "Guardado",
    });
};
exports.saveValidado = saveValidado;
