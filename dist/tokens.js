"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
/** Escapa comillas simples para SQL  */
function sqlEscape(value) {
    return value.replace(/'/g, "''");
}
async function main() {
    // 1) Lee tokens.json (asume que está en la raíz del proyecto)
    const raw = await fs_1.promises.readFile(path_1.default.resolve("tokens.json"), "utf8");
    const tokens = JSON.parse(raw);
    // 2) Genera un INSERT por fila
    const lines = tokens.map((t) => {
        const id = `'${sqlEscape(t.id)}'`;
        const token = `'${sqlEscape(t.token)}'`;
        const numero = t.numero !== null ? `'${sqlEscape(String(t.numero))}'` : "NULL";
        const dominio = t.dominio !== null ? `'${sqlEscape(t.dominio)}'` : "NULL";
        const estado = t.estado ? "TRUE" : "FALSE";
        const createdAt = `'${t.createdAt}'`;
        return `INSERT INTO "Token"(id, token, numero, dominio, estado, "createdAt") VALUES (${id}, ${token}, ${numero}, ${dominio}, ${estado}, ${createdAt}) ON CONFLICT (id) DO NOTHING;`;
    });
    // 3) Escribe tokens-import.sql
    const sqlFile = [
        `-- tokens-import.sql generado ${new Date().toISOString()}`,
        ...lines,
        "",
    ].join("\n");
    await fs_1.promises.writeFile("tokens-import.sql", sqlFile);
    console.log(`✔ Generado tokens-import.sql con ${tokens.length} filas`);
}
main().catch((err) => {
    console.error("⛔ Error al generar SQL:", err);
    process.exit(1);
});
