require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Initialise mongoose connection and handle initial error
mongoose.connect(DB.uri, DB.options).catch((err) => console.error(err));
//Handle errors after initial connection
mongoose.connection.on("error", (err) => console.error(err));
//Listen for the first emit of the "open" event (equivalent to the connected event)
mongoose.connection.once("open", () => console.log("Connection success !"));

module.exports = mongoose;