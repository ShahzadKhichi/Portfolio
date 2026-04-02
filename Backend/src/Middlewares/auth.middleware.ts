import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/AuthRequest";

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ 
                message: "Authentication required. Missing Bearer token.", 
                success: false 
            });
            return;
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "default_super_secret_for_jwt";
        
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({ 
            message: "Invalid or expired token", 
            success: false 
        });
    }
};
