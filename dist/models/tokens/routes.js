"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getToken_1 = require("./controller/getToken");
const saveToken_1 = require("./controller/saveToken");
const token = (0, express_1.Router)();
token.get("/", getToken_1.GetToken);
token.post("/", saveToken_1.GuardadoToken);
exports.default = token;
