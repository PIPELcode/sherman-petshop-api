import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
    try {
        const dbUrl = process.env.MONGODB_URL;
        if (!dbUrl) {

            throw new Error("MONGODB_URL is not defined in the environment variables.");
            
        }

        await mongoose.connect(dbUrl);
        console.log("Database connected successfully");

    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}