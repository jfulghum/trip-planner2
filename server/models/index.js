const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/tripdb', {logging: false})

db.define 