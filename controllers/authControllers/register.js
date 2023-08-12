const Joi = require("joi");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
    const { name, email, password } = req.body;

    const inputSchema = Joi.object({
        name: Joi.string().alphanum().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });

    const { error, value } = inputSchema.validate({ name, email, password: password.trim() });

    if (error) {
        return res.status(400).send({
            success: false,
            msg: error.message,
        });
    }

    try {
        const user = await User.findOne({ email: value.email });
        if (user) {
            return res.status(400).send({
                success: false,
                msg: "Email already registered.",
            });
        }

        const newUser = new User({
            name: value.name,
            email: value.email,
            password: value.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                await newUser.save();

                res.status(201).send({
                    success: true,
                });
            });
        });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
};
