"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "CLAVE SUPER MEGA SEGURA";
const verifyToken = (req, res, next) => {
    const token = req.headers["x-user"];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};
exports.verifyToken = verifyToken;
