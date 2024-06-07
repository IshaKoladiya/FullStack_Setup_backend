const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (data) => {
  return jwt.sign(data, "secret");
};

const verifyToken = (token) => {
  return jwt.verify(token, "secret");
};

const createHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const compareHash = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  createToken,
  createHash,
  compareHash,
  verifyToken,
};
