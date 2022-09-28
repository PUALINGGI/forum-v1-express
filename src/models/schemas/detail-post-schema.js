const Schema = require("mongoose").Schema;

const schema = new Schema({
   content: {type:"String", require:true}
});

module.exports = schema;