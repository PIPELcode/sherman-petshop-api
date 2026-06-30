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
const PORT = process.env.PORT;

// Database
dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

// Error handler middleware
app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});