
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as projectService from "../services/projectService";
import { Project } from "../models/interfaces";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all projects
 */
export const getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const projects: Project[] = await projectService.getAllProjects();

        res.status(HTTP_STATUS.OK).json(
            successResponse(projects, "Projects successfully retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Retrieves a single project by ID
 */
export const getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: number = Number(req.params.id);
        const project: Project | undefined =
            await projectService.getProjectById(id);

        if (!project) {
            res.status(404).json({
                success: false,
                error: {
                    message: "Project not found",
                    code: "PROJECT_NOT_FOUND",
                },
                timestamp: new Date().toISOString(),
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(project, "Project successfully retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Creates a new project
 */
export const createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, status } = req.body;

        if (!name || !status) {
            res.status(400).json({
                success: false,
                error: {
                    message: "Project name and status are required",
                    code: "VALIDATION_ERROR",
                },
                timestamp: new Date().toISOString(),
            });
            return;
        }

        const project: Project = await projectService.createProject(
            name,
            status
        );

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(project, "Project successfully created")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Updates an existing project
 */
export const updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const { name, status } = req.body;

        if (!name || !status) {
            res.status(400).json({
                success: false,
                error: {
                    message: "Project name and status are required",
                    code: "VALIDATION_ERROR",
                },
                timestamp: new Date().toISOString(),
            });
            return;
        }

        const project: Project | undefined =
            await projectService.updateProject(id, name, status);

        if (!project) {
            res.status(404).json({
                success: false,
                error: {
                    message: "Project not found",
                    code: "PROJECT_NOT_FOUND",
                },
                timestamp: new Date().toISOString(),
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(project, "Project successfully updated")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Deletes an existing project
 */
export const deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const deleted = await projectService.deleteProject(id);

        if (!deleted) {
            res.status(404).json({
                success: false,
                error: {
                    message: "Project not found",
                    code: "PROJECT_NOT_FOUND",
                },
                timestamp: new Date().toISOString(),
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Project successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};
