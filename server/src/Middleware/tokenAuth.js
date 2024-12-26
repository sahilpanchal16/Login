const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  try {
    console.log("reached-at-auth");
    const token = req.header("Authorization").split(" ")[1];
    let verification = null;
    verification = jwt.verify(token, "asdf@1234");

    req.user = { id: verification["id"] };

    req.token = token;
    next();
  } catch (error) {
    res.json({
      msg: "token is not valid",
    });
  }
};

module.exports = { authToken };
