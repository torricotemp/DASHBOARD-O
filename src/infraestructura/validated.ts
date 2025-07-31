import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { fromError } from "zod-validation-error";

export const validate =
  (schema: ZodSchema<any>, type: "body" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const dataToValidate = type === "body" ? req.body : req.query;
      schema.parse(dataToValidate);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const e = fromError(error).details;
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
