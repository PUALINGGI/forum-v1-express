const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.cekId = (req, res, next) => {
   const ID = [req.params.id, req.body.id];
   if (ID.every(id=>!ObjectId.isValid(id))) return res.status(400).json({ state: 400, error: "ID tidak valid!" });
   next();
}

// if user is NOT exists, raise an error
module.exports.userExistsById = (req, res, next) => {
   const ID = req.params.id;
   db.user.where({ _id: ID }).countDocuments((err, total) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      if (total < 1) return res.status(400).json({ state: 400, error: "User tidak di temukan!" });
      next();
   });
}

// if POST is not exists raise an error
module.exports.postExistsById = (req, res, next) => {
   const ID = req.params.id;
   db.post.where({ _id: ID }).countDocuments((err, total) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      if (total < 1) return res.status(400).json({ state: 400, error: "Postingan tidak di temukan!" });
      next();
   });
}

module.exports.cekBodyContent = (req, res, next) => {
   const content = req.body.content;
   if (!content) return res.status(500).json({ state: 500, error: err.message ?? err });
   next();
}

module.exports.cekBodyAddComment = (req, res, next) => {
   const comment = req.body.comment;
   const commentatorId = req.body.user;
   if (!comment || !commentatorId) return res.status(400).json({ state: 500, error: "Body request tidak valid!" });
   if (!ObjectId.isValid(commentatorId)) return res.satatus(400).json({ state: 400, error: "USER ID tidak valid!" });
   next();
}

module.exports.cekBodyAddLike = (req, res, next) => {
   const command = req.body.like;
   if (command !== "-1" && command !== "1") return res.status(400).json({
      state:400, error:"Body Request tidak valid, hanya boleh bernilai antara (-1 atau 1)."
   });
   next();
}