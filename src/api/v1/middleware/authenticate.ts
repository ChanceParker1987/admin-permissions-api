
import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;

    if (!token) {
        res.status(401).json({
            success: false,
            error: {
                message: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            },
            timestamp: new Date().toISOString(),
        });
        return;
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);

        res.locals.uid = decodedToken.uid;
        res.locals.role = decodedToken.role;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: {
                message: "Unauthorized: Invalid token",
                code: "TOKEN_INVALID",
            },
            timestamp: new Date().toISOString(),
        });
    }
};

export default authenticate;
