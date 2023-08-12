const path = require("path");
const express = require("express");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
require("colors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", authRoutes);

app.use((err, req, res, next) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server started on port:${PORT}`.bgBlue);
});
