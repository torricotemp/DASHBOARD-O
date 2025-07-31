import { Router } from "express";
import { registerVoto } from "./controllers/create.data";
import { validate } from "../../infraestructura/validated";
import { registroVotosSchema } from "../../infraestructura/schema";

const voto = Router();
voto.post("/register", validate(registroVotosSchema), registerVoto);

export default voto;
