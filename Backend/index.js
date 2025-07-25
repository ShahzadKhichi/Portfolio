const express = require("express");
const dotenv = require("dotenv");
const db_connect = require("./src/DB/Connect_DB");
dotenv.config({});
const PORT = process.env.PORT || 4000;
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("/home/msk/Desktop/vs_code/Portfolio/Frontend/dist"));

// app.use("/api/Admin");
// app.use("api/user");
app.get("*", (req, res) => {
  res.status(200).json({
    message: "Hello from server",
    success: true,
  });
});
(async () => {
  await db_connect();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`server started on port:${PORT}`);
  });
})();
