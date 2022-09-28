const route = require("express").Router();
const {
   getPostById, getPostByUserId,
   createPostByUserId,
   updatePostById, addCommentsById,
   addLikesById, deletePostinganById
} = require("../controllers/post-controller");
const {
   cekId, userExistsById, postExistsById,
   cekBodyContent, cekBodyAddComment, cekBodyAddLike
} = require("../middlewares/post-mid");

route.get("/:id", cekId, getPostById);
route.get("/user/:id", cekId, userExistsById, getPostByUserId);

route.post("/:id", cekId, cekBodyContent, userExistsById, createPostByUserId);

// route to edit post content
route.put("/edit/:id", cekId, cekBodyContent, postExistsById, updatePostById);
// route for add comment to some post
route.put("/comment/add/:id", cekId, cekBodyAddComment, postExistsById, addCommentsById);
// route forr add or reduce likes in some posts
route.put("/likes/:id", cekId, cekBodyAddLike, postExistsById, addLikesById);

route.delete("/:id", cekId, postExistsById, deletePostinganById);

module.exports = route;
