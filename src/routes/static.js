const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");
const validation = require("./validation");
const auth = require( "../util/authentication.js" );

router.get("/", staticController.index);

module.exports = router;
