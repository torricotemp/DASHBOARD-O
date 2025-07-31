"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const validate = (schema, type = "body") => (req, res, next) => {
    try {
        const dataToValidate = type === "body" ? req.body : req.query;
        schema.parse(dataToValidate);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const e = (0, zod_validation_error_1.fromError)(error).details;
            res.status(400).json({
                msg: "Error de validación",
                errors: e,
            });
            return;
        }
        res.status(500).json({
            msg: "Error interno del servidor",
        });
        return;
    }
};
exports.validate = validate;
