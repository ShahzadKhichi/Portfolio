const express = require("express");
const dotenv = require("dotenv");
const db_connect = require("./src/DB/Connect_DB");

dotenv.config({});

//routers

const publicRouter = require("./src/Routes/public.route");
const PORT = process.env.PORT || 4000;
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

//routers used

app.use("/public/", publicRouter);

app.get("*", (req, res) => {
  res.status(200).json({
    active: true,
    error: false,
  });
});
(async () => {
  await db_connect();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`server started on port:${PORT}`);
  });
})();
