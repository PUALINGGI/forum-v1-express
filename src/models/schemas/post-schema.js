const Schema = require("mongoose").Schema;
const schema = new Schema({
   user: { type: "ObjectId", ref: "user" },
   comments: [{ type: "ObjectId", ref: "comments" }],
   likes: { type: "Number", default: 0 },
   details: { type: "ObjectId", ref: "detail_post" }
});

module.exports = schema;