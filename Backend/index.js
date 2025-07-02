const express = require("express");
const dotenv = require("dotenv");
const db_connect = require("./src/DB/Connect_DB");
dotenv.config({});
const PORT = process.env.PORT || 4000;
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

// app.use("/api/Admin");
// app.use("api/user");
app.get("/", (req, res) => {
  console.log("here");

  res.sendFile(
    "/home/msk/Desktop/vs_code/Portfolio/Frontend/dist/index.html",
    () => {
      res.send("falied to get file");
    }
  );
});
(async () => {
  await db_connect();
  app.listen(PORT, () => {
    console.log(`server started on port:${PORT}`);
  });
})();
