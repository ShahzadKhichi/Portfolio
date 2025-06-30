const express = require("express");
const dotenv = require("dotenv");
const db_connect = require("./src/DB/Connect_DB");
dotenv.config({});
const PORT = process.env.PORT || 3000;
const app = express();
(async () => {
  await db_connect();
  app.listen(PORT, () => {
    console.log(`server started on port:${PORT}`);
  });
})();
