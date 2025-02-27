const server = require("./serverless");

module.exports = (req, res) => {
  return server(req, res);
};
