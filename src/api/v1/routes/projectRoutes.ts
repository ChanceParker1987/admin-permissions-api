
import express, { Router } from "express";
import * as projectController from "../controllers/projectController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

router.get(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "lead", "developer"] }),
    projectController.getAllProjects
);

export default router;
