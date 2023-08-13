const path = require("path");
const express = require("express");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
require("colors");
const errorHandler = require("./middleware/error");
const authRoutes = require("./routes/authRoutes");
const connetToDatabase = require("./config/connectDB");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { ensureAuthenticated } = require("./middleware/isAuthenticated");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

require("./config/passport")(passport);

connetToDatabase();

app.use(
    session({
        name: "_a9xrlsdf",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.mongoURI }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 3,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/dashboard", ensureAuthenticated, (req, res) => {
    const { name } = req.user;

    res.send(`Dashboard - Welcome ${name}`);
});

app.get("/login-success", (req, res) => {
    res.redirect("/dashboard");
});

app.get("/login-failure", (req, res) => {
    res.status(401).send("Invalid Credentials");
});

app.use("/", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port:${PORT}`.bgBlue);
});
