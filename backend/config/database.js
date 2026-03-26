const mongoose =require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URI not found in .env");
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");

    } catch (error) {
        console.error("Database connection error:", error.message);
    }
};

module.exports = connectDB;