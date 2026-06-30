import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

export const dbConnection = async (): Promise<void> => {
    if (cachedConnection) {
        return;
    }

    const dbUrl = process.env.MONGODB_URL;
    if (!dbUrl) {
        throw new Error("MONGODB_URL is not defined.");
    }

    cachedConnection = await mongoose.connect(dbUrl, {
        bufferCommands: false,
    });
    console.log("Database connected successfully");
};