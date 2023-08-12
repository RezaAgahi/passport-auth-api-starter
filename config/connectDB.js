const mongoose = require("mongoose");
const errorHandler = require("../middleware/error");

const connetToDatabase = async () => {
    try {
        await mongoose.connect(process.env.mongoURI, {
            serverSelectionTimeoutMS: process.env.NODE_ENV === "production" ? 3000 : 300,
        });

        console.log(`Connect to DB`.bgCyan);
    } catch (error) {
        errorHandler(error);
    }
};

module.exports = connetToDatabase;
