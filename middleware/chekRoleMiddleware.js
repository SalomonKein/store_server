const jwt = require("jsonwebtoken");

module.exports = function(role){
return function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.autorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({message: "Not autorization"});
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if(decoded.role !== role){
        return res.status(403).json({message: "you don't have access"});
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({message: "Not autorization"});
  }
}}
