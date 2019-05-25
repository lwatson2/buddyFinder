const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const sesion = require("express-session");
const db = require("./config/keys").MONGODB_URI;
const user = require("./routes/users");
const post = require("./routes/posts");
const path = require("path");
const push = require("./routes/push");
const router = express.Router();
const webpush = require("web-push");

//Server config
const PORT = process.env.PORT || 5000;
const app = express();
//Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

app.post("/sendNotification", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;
  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({
    title: "New Notification",
    body: "Please go to your profile to view your notifications."
  });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

//Passport config

//MongoDB config

mongoose
  .connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

//Route config

app.use("/users", user);
app.use("/posts", post);
app.use("/push", push);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
const server = app.listen(PORT, () =>
  console.log(`server started on port ${PORT}`)
);
