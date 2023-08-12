const errorHandler = (err, req, res, next) => {
    console.log(err);
    console.log("\n\n\n");
    console.log("Error name :".red, err.name);
    console.log("Error message :".red, err.message);
    console.log("Error code :".red, err.code);

    // database connection issue
    if (err.name == "MongooseServerSelectionError") {
        console.log("Can't connect to databse".bgRed);
        process.exit(1);
    }

    // Email validation issue mongoose
    if (err.name == "ValidationError") {
        console.log(err.errors.message);
        console.log("Validation Error".bgRed);
        res.status(400).send({
            success: false,
            msg: err.message,
        });
    }

    // Email exist mongoose issue
    if (err.code == 11000) {
        // console.log(err.errors.message);
        console.log("Validation Error".bgRed);
        res.status(400).send({
            success: false,
            msg: "The email already registered",
        });
    }
};

module.exports = errorHandler;
