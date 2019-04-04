const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const sesion = require("express-session");
const db = require("./config").MONGODB_URI;
const user = require("./routes/users");
const post = require("./routes/posts");
const router = express.Router();

//Server config
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
const server = app.listen(PORT, () =>
  console.log(`server started on port ${PORT}`)
);

//Passport config

//MongoDB config

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//Route config

app.use("/users", user);
app.use("/posts", post);
