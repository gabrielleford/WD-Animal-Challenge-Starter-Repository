const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "postgres://postgres:IS~SG&04*26;15@localhost:5432/animal-server"
);

module.exports = db;
