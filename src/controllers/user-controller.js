const db = require("../models");

/**
 * @param {string} ID valid object ID
 * @param {string} NAMA nama user
 * @param {string} PASS password user
 */
function helper(ID, NAMA, PASS) {
   if (ID) return { _id: ID };
   if (NAMA && PASS) return { $and: [{ nama: NAMA }, { password: PASS }] };
   return false;
}

module.exports.getUsers = (req, res, next) => {
   db.user.where({}).select("-__v").find((err, users) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      res.status(200).json({
         state: 200, users: users
      });
   });
}

module.exports.getUserById = (req, res, next) => {
   const ID = req.params.id;
   db.user.where({ _id: ID }).select("-__v").findOne((err, user) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      res.status(200).json({
         state: 200, user: user
      });
   });
}

module.exports.getUserByQuery = (req, res, next) => {
   const [ID, NAMA, PASS] = [req.query.id ?? undefined, req.query.nama ?? undefined, req.query.password ?? false];
   const param = helper(ID, NAMA, PASS);
   db.user.where({ $or: [param] }).select("-__v").findOne((err, user) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      res.status(200).json({
         state: 200, user: user
      });
   });
}

module.exports.createUser = (req, res, next) => {
   db.user.create(req.body, (err, user) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      res.status(201).json({
         state: 201, user: user
      });
   });
}

module.exports.updateUserById = (req, res, next) => {
   const ID = req.params.id;
   db.user.where({ _id: ID }).select("-__v").set(req.body).setOptions({ new: true }).findOneAndUpdate((err, user) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      res.status(201).json({
         state: 201, newUser: user
      });
   });
}

module.exports.deleteUserById = (req, res, next) => {
   const ID = req.params.id;
   db.user.where({ _id: ID }).deleteOne((err, state) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      return res.status(200).json({
         state: 200, message: `User berhasil di hapus sebanyak ${state.deletedCount}`
      });
   });
}

