const mongoose = require("mongoose");
const URI = "mongodb+srv://pualinggi:pualinggi@forumv1-express.igfihu8.mongodb.net/forumv1Express?retryWrites=true&w=majority";
const OPS = { useNewUrlParser: true };

mongoose.connect(URI, OPS).then(
   () => { console.log("Connect to the database!") },
   (err) => { console.log("Cannot connect to the database!") }
);


const db = {};
db.connection = mongoose.connection;

db.user = mongoose.connection.model("user",require("./schemas/user-schema"),"user");
db.post = mongoose.connection.model("post",require("./schemas/post-schema"),"post");
db.comments = mongoose.connection.model("comments",require("./schemas/comments-schema"),"comments");
db.detailPost = mongoose.connection.model("detail_post", require("./schemas/detail-post-schema"),"detail_post");

module.exports = db;