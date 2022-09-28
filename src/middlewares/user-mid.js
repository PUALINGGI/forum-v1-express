const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * @param {string} ID valid object ID
 * @param {string} NAMA nama user
 * @param {string} PASS password user
 * @returns 
 */
const helper = (ID, NAMA, PASS) => {
   if (ID) return { _id: ID };
   if (NAMA, PASS) return {
      $and: [{ nama: NAMA }, { password: PASS }]
   };
   return false;
}

/**
 * @param {*} req Request Interface
 * @param {*} res Response Interface
 * @param {*} next NextFunction Interface
 */
// If user is Exists, raise an error
module.exports.userExists = (req, res, next) => {
   const ID = req.params.id ?? req.query.id ?? undefined;
   const [NAMA, PASS] = [req.body.nama ?? req.query.nama ?? undefined, req.body.password ?? req.query.password ?? undefined];
   const querys = helper(ID, NAMA, PASS);
   db.user.where({ $or: [querys] }).countDocuments((err, total) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      if (total > 0) return res.status(409).json({ state: 409, error: "User sudah ada!" });
      next();
   });
}

/**
 * @param {*} req Request Interface
 * @param {*} res Response Interface
 * @param {*} next NextFunction Interface
 */
// If user is Not Exists, raise an error
module.exports.userNotExists = (req, res, next) => {
   const ID = req.params.id ?? req.query.id ?? undefined;
   const [NAMA, PASS] = [req.body.nama ?? req.query.nama ?? undefined, req.body.password ?? req.query.password ?? undefined];
   const querys = helper(ID, NAMA, PASS);
   db.user.where({ $or: [querys] }).countDocuments((err, total) => {
      if (err) return res.status(500).json({ state: 500, error: err.message ?? err });
      if (total < 1) return res.status(409).json({ state: 409, error: "User tidak di temukan!" });
      next();
   });
}

module.exports.cekId = (req, res, next) => {
   const ID = req.params.id ?? req.query.id ?? undefined;
   if (!ObjectId.isValid(ID)) return res.status(400).json({ state: 400, error: "ID tidak valid!" });
   next();
}

module.exports.cekQuery = (req, res, next) => {
   const ID = req.params.id ?? req.query.id ?? undefined;
   const [NAMA, PASS] = [req.body.nama ?? req.query.nama ?? undefined, req.body.password ?? req.query.password ?? undefined];
   if (ID && !ObjectId.isValid(ID)) return res.status(400).json({ state: 400, error: "ID tidak valid!" });
   if (!ID || (!NAMA || !PASS)) return res.status(400).json({ state: 400, error: "Query tidak valid!" });
   next();
}

module.exports.cekPostBody = (req, res, next) => {
   const bodys = [req.body.nama ?? false, req.body.password ?? false];
   if (bodys.includes(false)) return res.status(400).json({ state: 400, error: "Request body tidak valid!" });
   next();
}

module.exports.cekPutBody = (req, res, next) => {
   const bodys = [req.body.nama ?? false, req.body.password ?? false];
   if (bodys.every(i=>i===false)) return res.status(400).json({ state: 400, error: "Request body tidak valid!" });
   next();
}