"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenSchema = exports.registroVotosSchemaAll = exports.registroVotosSchema = exports.tipoEnum = void 0;
const zod_1 = require("zod");
// export const metodoEnum = z.enum(["TUXLER", "MODO_AVION"]);
exports.tipoEnum = zod_1.z.enum([
    "PRE_ENVIO",
    "VOTO_TOKEN",
    "VOTO_GERACION_TOKEN_ALEATORIA",
    "SIMULACION",
]);
exports.registroVotosSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    timestamp: zod_1.z.string().optional(),
    ip_publica: zod_1.z.string().optional(),
    id_public_user: zod_1.z.string().optional(),
    numero: zod_1.z.string().optional(),
    latitud: zod_1.z.string().optional(),
    longitud: zod_1.z.string().optional(),
    ci: zod_1.z.string().optional(),
    dia_nacimiento: zod_1.z.string().optional(),
    mes_nacimiento: zod_1.z.string().optional(),
    anio_nacimiento: zod_1.z.string().optional(),
    pais: zod_1.z.string().optional(),
    ciudad: zod_1.z.string().optional(),
    departamento: zod_1.z.string().optional(),
    provincia: zod_1.z.string().optional(),
    municipio: zod_1.z.string().optional(),
    recinto: zod_1.z.string().optional(),
    candidato: zod_1.z.string().optional(),
    tipo: zod_1.z.string().optional(),
    token_solicutd: zod_1.z.string().optional(),
    codigo_respuesta: zod_1.z.string().optional(),
    respuesta: zod_1.z.string().optional(),
    id_dispositivo: zod_1.z.string().optional(),
    metodo: zod_1.z.string().optional(),
    refer_envio: zod_1.z.string().optional(),
    token_refer: zod_1.z.string().optional(),
    pregunta1: zod_1.z.string().optional(),
    pregunta2: zod_1.z.string().optional(),
    pregunta3: zod_1.z.string().optional(),
});
exports.registroVotosSchemaAll = zod_1.z.object({
    registros: zod_1.z.array(exports.registroVotosSchema),
});
exports.tokenSchema = zod_1.z.object({
    id: zod_1.z.string(),
    token: zod_1.z.string(),
    numero: zod_1.z.string().optional(),
    dominio: zod_1.z.string().optional(),
    estado: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
});
