import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export const dbConnection = async (): Promise<void> => {
    if (cachedConnection) {
        console.log("Conexión a BD reutilizada");
        return;
    }

    const dbUrl = process.env.MONGODB_URL;
    if (!dbUrl) {
        throw new Error("MONGODB_URL is not defined in the environment variables.");
    }

    try {
        const conn = await mongoose.connect(dbUrl);
        cachedConnection = conn;
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}