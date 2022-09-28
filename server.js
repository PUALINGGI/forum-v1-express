const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/user", require("./src/routes/user-route"));
server.use("/post", require("./src/routes/post-route"));

const PORT = process.env.PORT||8000;
server.listen(PORT, () => {
   console.clear();
   console.log("Server Up!");
});