// import { PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";
// import { registroVotosSchema } from "../../../infraestructura/schema";
// const prisma = new PrismaClient();

// export const registerVotoAll = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { registros } = req.body;

//     if (!Array.isArray(registros)) {
//       res.status(400).json({
//         msg: "El formato debe ser un array de registros",
//       });
//       return;
//     }

//     const validaciones = registros.map((registro) => {
//       try {
//         return registroVotosSchema.parse(registro);
//       } catch (error) {
//         return null;
//       }
//     });

//     const registrosInvalidos = validaciones.filter((v) => v === null).length;
//     if (registrosInvalidos > 0) {
//       res.status(400).json({
//         msg: `Se encontraron ${registrosInvalidos} registros con formato inválido`,
//       });
//       return;
//     }
//     const ipPublica = String(req.headers["x-forwarded-for"] || req.ip);

//     const resultados = await prisma.registro_votos.createMany({
//       data: validaciones
//         .filter((v): v is NonNullable<typeof v> => v !== null)
//         .map((registro) => ({
//           ...registro,
//           metodo: registro.metodo || null,
//           id_public_user: ipPublica,
//           tipo: registro.tipo || null,
//           timestamp: registro.timestamp || null,
//           ip_publica: registro.ip_publica || null,
//           numero: registro.numero || null,
//           latitud: registro.latitud || null,
//           longitud: registro.longitud || null,
//           ci: registro.ci || null,
//           dia_nacimiento: registro.dia_nacimiento || null,
//           mes_nacimiento: registro.mes_nacimiento || null,
//           anio_nacimiento: registro.anio_nacimiento || null,
//           pais: registro.pais || null,
//           ciudad: registro.ciudad || null,
//           candidato: registro.candidato || null,
//           token_solicutd: registro.token_solicutd || null,
//           codigo_respuesta: registro.codigo_respuesta || null,
//           respuesta: registro.respuesta || null,
//           id_dispositivo: registro.id_dispositivo || null,
//           refer_envio: registro.refer_envio || null,
//           token_refer: registro.token_refer || null,
//         })),
//     });

//     res.status(200).json({
//       msg: `Se almacenaron ${resultados.count} registros correctamente`,
//       registros_creados: resultados.count,
//     });
//   } catch (error) {
//     console.error("Error al guardar registros:", error);
//     res.status(500).json({
//       msg: "Error interno al procesar los registros",
//     });
//   }
// };
