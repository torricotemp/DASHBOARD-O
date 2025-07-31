import { promises as fs } from "fs";
import path from "path";

/** Ajusta si tu JSON tiene otro shape */
interface TokenRow {
  id: string;
  token: string;
  numero: string | number | null; // Cambia a string | number | null
  dominio: string | null;
  estado: boolean;
  createdAt: string; // «YYYY‑MM‑DD HH:MM:SS[.mmm]»
}

/** Escapa comillas simples para SQL  */
function sqlEscape(value: string): string {
  return value.replace(/'/g, "''");
}

async function main() {
  // 1) Lee tokens.json (asume que está en la raíz del proyecto)
  const raw = await fs.readFile(path.resolve("tokens.json"), "utf8");
  const tokens: TokenRow[] = JSON.parse(raw);

  // 2) Genera un INSERT por fila
  const lines = tokens.map((t) => {
    const id = `'${sqlEscape(t.id)}'`;
    const token = `'${sqlEscape(t.token)}'`;
    const numero =
      t.numero !== null ? `'${sqlEscape(String(t.numero))}'` : "NULL";
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

  await fs.writeFile("tokens-import.sql", sqlFile);
  console.log(`✔ Generado tokens-import.sql con ${tokens.length} filas`);
}

main().catch((err) => {
  console.error("⛔ Error al generar SQL:", err);
  process.exit(1);
});
