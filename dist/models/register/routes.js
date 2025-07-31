"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_data_1 = require("./controllers/create.data");
const validated_1 = require("../../infraestructura/validated");
const schema_1 = require("../../infraestructura/schema");
const voto = (0, express_1.Router)();
voto.post("/register", (0, validated_1.validate)(schema_1.registroVotosSchema), create_data_1.registerVoto);
exports.default = voto;
