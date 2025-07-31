"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const promises_1 = __importDefault(require("fs/promises"));
const prisma = new client_1.PrismaClient();
async function main() {
    // Lee el JSON (puede ser tokens.json o un string desde alguna API)
    const raw = await promises_1.default.readFile("tokens.json", "utf8");
    const tokens = JSON.parse(raw);
    // Inserta en bloque
    await prisma.token.createMany({
        data: tokens.map((t) => ({
            id: t.id,
            token: t.token,
            numero: t.numero,
            dominio: t.dominio,
            estado: t.estado,
            createdAt: new Date(t.createdAt),
        })),
        skipDuplicates: true, // evita error si el id ya existe
    });
    console.log("✔ Tokens importados");
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
