import express, { Express } from "express";
import morgan from "morgan";
import projectRoutes from "./api/v1/routes/projectRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
const app: Express = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;
