const route = require("express").Router();
const {
   getUsers, getUserById, getUserByQuery,
   createUser,
   updateUserById,
   deleteUserById
} = require("../controllers/user-controller");
const {
   userExists, userNotExists,
   cekId, cekQuery,
   cekPostBody, cekPutBody
} = require("../middlewares/user-mid");

route.get("/", getUsers);
route.get("/query", cekQuery, getUserByQuery);
route.get("/:id", cekId, getUserById);

route.post("/", cekPostBody, userExists, createUser);

route.put("/:id", cekPutBody, cekId, userNotExists, updateUserById);

route.delete("/:id", cekId, userNotExists, deleteUserById);

module.exports = route;