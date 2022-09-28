const Schema = require("mongoose").Schema;

const schema = new Schema({
   user: { type: "ObjectId", ref: "user" },
   comment: { type: "String", require: true }
});

module.exports = schema;