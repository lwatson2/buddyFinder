const express = require("express");
const router = express.Router();
const webpush = require("web-push");
const googleKey = require("../config/keys").GOOGLE_ACCESS_KEY;
const publicKey = require("../config/keys").PUBLIC_KEY;
const privateKey = require("../config/keys").PRIVATE_KEY;
const path = require("path");

webpush.setGCMAPIKey(googleKey);
webpush.setVapidDetails(
  "mailto:loganawatson2@gmail.com",
  publicKey,
  privateKey
);

let subscription;
let pushIntervalID;

router.post("/register", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "test", body: "i hope this works " });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

module.exports = router;
