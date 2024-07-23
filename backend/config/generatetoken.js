const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.Secret_key, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;

