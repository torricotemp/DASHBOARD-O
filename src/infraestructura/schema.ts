import { z } from "zod";

// export const metodoEnum = z.enum(["TUXLER", "MODO_AVION"]);

export const tipoEnum = z.enum([
  "PRE_ENVIO",
  "VOTO_TOKEN",
  "VOTO_GERACION_TOKEN_ALEATORIA",
  "SIMULACION",
]);

export const registroVotosSchema = z.object({
  id: z.string().optional(),
  timestamp: z.string().optional(),
  ip_publica: z.string().optional(),
  id_public_user: z.string().optional(),
  numero: z.string().optional(),
  latitud: z.string().optional(),
  longitud: z.string().optional(),
  ci: z.string().optional(),
  dia_nacimiento: z.string().optional(),
  mes_nacimiento: z.string().optional(),
  anio_nacimiento: z.string().optional(),
  pais: z.string().optional(),
  ciudad: z.string().optional(),
  departamento: z.string().optional(),
  provincia: z.string().optional(),
  municipio: z.string().optional(),
  recinto: z.string().optional(),
  candidato: z.string().optional(),
  tipo: z.string().optional(),
  token_solicutd: z.string().optional(),
  codigo_respuesta: z.string().optional(),
  respuesta: z.string().optional(),
  id_dispositivo: z.string().optional(),
  metodo: z.string().optional(),
  refer_envio: z.string().optional(),
  token_refer: z.string().optional(),
  pregunta1: z.string().optional(),
  pregunta2: z.string().optional(),
  pregunta3: z.string().optional(),
});

export type RegistroVotos = z.infer<typeof registroVotosSchema>;

export const registroVotosSchemaAll = z.object({
  registros: z.array(registroVotosSchema),
});

export const tokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  numero: z.string().optional(),
  dominio: z.string().optional(),
  estado: z.boolean(),
  createdAt: z.date(),
});

export type Token = z.infer<typeof tokenSchema>;
