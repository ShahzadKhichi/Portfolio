"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => {
    return (req, res, next) => {
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
exports.validateBody = validateBody;
