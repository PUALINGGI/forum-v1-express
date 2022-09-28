const db = require("../models");

module.exports.getPostById = (req, res, next) => {
   const ID = req.params.id;
   db.post.where({ _id: ID }).select("-__v").populate({
      path: "user", select: "-password -__v"
   }).populate({
      path: "comments", select: "-__v",
      populate: { path:"user", select:"-__v -password" }
   }).populate({
      path: "details", select: "-__v"
   }).findOne((err, postingan) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      res.status(200).json({
         state: 200, posts: postingan
      });
   });
}

module.exports.getPostByUserId = (req, res, next) => {
   const userId = req.params.id;
   db.post.where({ user: userId }).select("-__v").populate({
      path: "user", select: "-password -__v"
   }).populate({
      path: "comments", select: "-__v"
   }).populate({
      path: "details", select: "-__v"
   }).find((err, postingan) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      res.status(200).json({
         state: 200, posts: postingan
      });
   });
}

module.exports.createPostByUserId = (req, res, next) => {
   const userId = req.params.id;
   const content = req.body.content;
   db.detailPost.create({ content: content }, (err, detail) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      db.post.create({ user: userId, comments: [], details: detail._id }, (err, postingan) => {
         if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
         return res.status(201).json({
            state: 201, post: postingan
         });
      });
   });
}

module.exports.updatePostById = (req, res, next) => {
   const ID = req.params.id;
   const content = req.body.content;
   db.post.where({ _id: ID }).populate({ path: "details" }).findOne((err, postingan) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? er });
      postingan.details.content = content;
      postingan.details.save((err, detail) => {
         if (err) return res.status(500).json({ state: 500, error: err.message ?? er });
         return res.status(201).json({
            state: 201, message: "Postingan berhasil di perbaharui!"
         });
      });
   });
}

module.exports.addCommentsById = (req, res, next) => {
   const ID = req.params.id;
   const comment = req.body.comment;
   const commentatorId = req.body.user;
   db.post.where({ _id: ID }).findOne((err, postingan) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      db.comments.create({ user: commentatorId, comment: comment }, (err, komentar) => {
         if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
         postingan.comments.push(komentar._id);
         postingan.save((err, postingan) => {
            if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
            res.status(201).json({ state: 201, message: "Comment Berhasil di Tambahkan!" });
         });
      });
   });
}

module.exports.addLikesById = (req, res, next) => {
   const ID = req.params.id;
   const command = req.body.like;
   db.post.where({ _id: ID }).select("likes").findOne((err, postingan) => {
      if (command === 1) postingan.likes += 1;
      if (command === -1) postingan.likes -= 1;
      postingan.save((err) => {
         if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
         res.status(201).json({
            state: 201, message: "Like berhasil di perbaharui!"
         });
      });
   });
}

module.exports.deletePostinganById = (req, res, next) => {
   const ID = req.params.id;
   db.post.where({ _id: ID }).findOne((err, postingan) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      const uBound = postingan.comments.length;
      for (let i = 0; i < uBound; i++){
         db.comments.where({ _id: postingan.comments[i] }).deleteOne((err, state) => {
            if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
            console.log(`menghapus comment[${i}]`);
            i++;
         });
      }
      db.detailPost.where({ _id: postingan.details }).deleteOne((err, state) => {
         if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
         postingan.deleteOne((err, state) => {
            if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
            res.status(200).json({
               state: 200, message: `Postingan berhasil di hapus sebanyak ${state.deletedCount}`
            });
         });
      });
   });
}