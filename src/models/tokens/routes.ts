import { Router } from "express";
import { GetToken } from "./controller/getToken";
import { GuardadoToken } from "./controller/saveToken";
import { VotoPorUsuario } from "../register/controllers/report";

const token = Router();
token.get("/", GetToken);
token.post("/", GuardadoToken);

export default token;
