const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: "Email is not registered" });
            }

            bcrypt.compare(password, user.password, (err, res) => {
                if (err) done(err);
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Incorrect Password" });
                }
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        const user = await User.findById(id);
        done(null, user);
    });
};
