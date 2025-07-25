const router = require("express").Router();

const { sendMail } = require("../Controllers/public.controller");

router.post("/sendMail", sendMail);

module.exports = router;
