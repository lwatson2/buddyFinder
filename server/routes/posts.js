const express = require("express");
const router = express.Router();

router.get("/newpost", (req, res) => {
  console.log("test");
  res.json({
    msg: "hi"
  });
});

module.exports = router;
