const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
//Import google cloud client library
const vision = require("@google-cloud/vision");

const session = require("express-session");
// IMPORT MODELS

const app = express();

//Create client
//Create client
const client = new vision.ImageAnnotatorClient({
                                                   keyFilename: "key.json",
                                               });

app.use(fileUpload());

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || `mongodb://localhost:27017/food_app`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

app.use(bodyParser.json());

app.use(
    session({
                resave: false,
                saveUninitialized: true,
                secret: "any string",
            })
);

// Upload Endpoint
app.post("/upload", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: "No file uploaded"});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/resources/${file.name}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        client
            .labelDetection(`${__dirname}/resources/${file.name}`)
            .then((results) => {
                const labels = results[0].labelAnnotations;

                const labelSummaries = labels.map((label) => ({
                    description: label.description,
                    score: label.score,
                }));

                // console.log({labels});
                // console.log({labelSummaries});
                res.json({
                             fileName: file.name,
                             filePath: `/uploads/${file.name}`,
                             resultSummaries: labelSummaries,
                         });
            })
            .catch((err) => {
                console.error("ERROR:", err);
            });
    });
});
//IMPORT ROUTES
require("./controllers/users.controller.server")(app);
require("./controllers/recipes.controller.server")(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
