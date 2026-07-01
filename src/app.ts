//DOTENV
import "dotenv/config";

//EXPRESS
import express from "express";

//CORS
import cors from "cors";

//MONGO DABATASE
import { dbConnection } from "./config/database/dbConnection";

//ROUTES
import router from "./routes/index";

//ERROR HANDLER
import { errorHandler } from "./middlewares/errHandler/errorHandler";

const app = express();

// Database
app.use(async (_req, res, next) => {
    try {
        await dbConnection();
        next();
    } catch (error) {
        console.error("An internal error has occurred", error);
        res.status(500).json({ message: "Error: without connection to database" });
    }
});
// Middlewares
app.use(cors({
    origin: "*",
}));
app.use(express.json());

// Routes
app.use("/", router);

// Error handler middleware
app.use(errorHandler);


export default app;
