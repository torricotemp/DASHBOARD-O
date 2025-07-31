"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarTokenManual = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "CLAVE SUPER MEGA SEGURA";
const generarTokenManual = (payload) => {
    const data = payload || {
        f67ac5b080154e4c57f888e947e08f8a43bb98d3a5bb000508abe7f48beaea43: "272b81a742e0641fe7178566ffc1f58e2f454cafc18791aa561b652adec700fc",
    };
    const token = jsonwebtoken_1.default.sign(data, JWT_SECRET, {
        expiresIn: "3d",
    });
    return token;
};
exports.generarTokenManual = generarTokenManual;
