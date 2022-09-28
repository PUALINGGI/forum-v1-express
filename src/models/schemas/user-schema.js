const Schema = require("mongoose").Schema;

const schema = new Schema({
   nama: { type: "String", require: true },
   password: {type:"String", require:true}
});

module.exports = schema;