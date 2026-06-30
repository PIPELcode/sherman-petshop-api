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

// Database
dbConnection();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

// Error handler middleware
app.use(errorHandler);


export default app;
