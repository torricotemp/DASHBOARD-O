"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVoto = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerVoto = async (req, res) => {
    const { body } = req;
    console.log(body);
    const { recaptcha_token, refer_envio, token_refer, ...datosValidos } = body;
    const ipPublica = req.headers["x-forwarded-for"] || req.ip;
    const referer = (req.headers.referer || "").trim().replace(/`/g, "");
    let tokenFromReferer = "";
    if (referer) {
        try {
            const urlParams = new URL(referer).searchParams;
            tokenFromReferer = urlParams.get("token") || "";
        }
        catch (error) {
            console.error("Error al parsear el referer URL:", error);
        }
    }
    refer_envio;
    const register = await prisma.registro_votos.create({
        data: {
            ...datosValidos,
            id_public_user: ipPublica,
            refer_envio: referer,
            token_refer: tokenFromReferer,
        },
    });
    if (!register) {
        res.status(400).json({
            msg: "No se pudo guardar",
        });
        return;
    }
    res.status(200).json({
        msg: "Se almaceno de forma correcta , tipo: " + body.tipo,
    });
};
exports.registerVoto = registerVoto;
