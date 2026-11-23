import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as projectService from "../services/projectService";
import { Project } from "../models/interfaces";
import { successResponse } from "../models/responseModel";

/**
 * Manages requests and reponses to retrieve all Projects
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const items: Project[] = await projectService.getAllProjects();
        res.status(HTTP_STATUS.OK).json(
            successResponse(items, "Projects successfully retireved")
        );
    } catch (error: unknown) {
        next(error);
    }
};