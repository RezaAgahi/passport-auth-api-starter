const path = require("path");
const express = require("express");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
require("colors");
const errorHandler = require("./middleware/error");
const authRoutes = require("./routes/authRoutes");
const connetToDatabase = require("./config/connectDB");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connetToDatabase();

app.use("/", authRoutes);

// test

app.post("/test", async (req, res, next) => {
    try {
        const newUser = new User({
            name: "reza",
            email: "reza@a1.com",
            password: "passWOrd",
        });

        await newUser.save();
        console.log(`User ${newUser.name} saved`);
        console.log(newUser);
        res.send("ok");
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port:${PORT}`.bgBlue);
});

// Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//     console.log(`Error: ${err.message}`.red);
//     // Close server & exit process
//     // server.close(() => process.exit(1));
// });
