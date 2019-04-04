const express = require("express");
const router = express.Router();

router.get("/newuser", (req, res) => {
  console.log("test");
});

module.exports = router;
