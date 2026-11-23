
import { Request, Response, NextFunction } from "express";

interface AuthorizationOptions {
    hasRole: string[];
}

const isAuthorized = (options: AuthorizationOptions) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        const role = res.locals.role;

        if (!role) {
            res.status(403).json({
                success: false,
                error: {
                    message: "Forbidden: No role assigned",
                    code: "ROLE_NOT_FOUND",
                },
                timestamp: new Date().toISOString(),
            });
            return;
        }

        if (!options.hasRole.includes(role)) {
            res.status(403).json({
                success: false,
                error: {
                    message: "Forbidden: Insufficient permissions",
                    code: "INSUFFICIENT_ROLE",
                },
                timestamp: new Date().toISOString(),
            });
            return;
        }

        next();
    };
};

export default isAuthorized;
