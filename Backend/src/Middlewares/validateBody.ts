import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parseResult.error.issues,
        success: false,
      });
      return;
    }
    
    // Replace req.body with the sanitized/parsed data
    req.body = parseResult.data;
    next();
  };
};
