module.exports.verifyToken = function(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  //Check if undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    //GEt token from array
    const bearerToken = bearer[1];
    //Set token
    req.token = bearerToken;

    next();
  } else {
    //Forbid
    res.sendStatus(403);
  }
};
