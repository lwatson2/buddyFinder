const express = require("express");
const router = express.Router();

router.get("/newpost", (req, res) => {
  console.log("test");
});

module.exports = router;
