const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const url =
  "mongodb+srv://dbuser:asdf1234X@cluster0.qo1pe.mongodb.net/testdb?retryWrites=true&w=majority";
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Mongo connect");
});
mongoose.connect(url);
module.exports = db;
