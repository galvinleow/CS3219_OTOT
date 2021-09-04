// Import express - To have a web server in order to make API endpoint accessible
let express = require("express");
// Import routes - Declare all API endpoint there
let apiRoutes = require("./api-routes");
// Import Body Parser - Enables app to parse data from incoming request like form data via urlencode
let bodyParser = require("body-parser");
// Import Mongoose - Handle validation and business logic
let mongoose = require("mongoose");

// Initialize the app
let app = express();

// Configure bobyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect("mongodb://localhost/resthub", { useNewUrlParser: true });
var db = mongoose.connection;

if (!db) {
  console.log("Error connection db");
} else {
  console.log("Db connected sucessfully");
}

// Send message for default URL
app.get("/", (req, res) =>
  res.send("CS3219 Backend with NodeJS and Express Working")
);

// Setup server port
var port = process.env.PORT || 8080;

// Use API routes in the App
// E.g. http://localhost:8080/api
// Anything after /api will be from the apiRoutes
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Backend on port" + port);
});
