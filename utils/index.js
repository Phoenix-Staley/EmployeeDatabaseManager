// Inports all the sql querying functions and export them together
const queries = require("./quieries");
const inserts = require("./inserts");
const updates = require("./updates");
const deletes = require("./deletes");

module.exports = { queries, inserts, updates, deletes };