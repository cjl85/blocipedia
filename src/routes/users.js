const express = require( "express" );
const router = express.Router();
const userController = require("../controllers/userController")
const validation = require("./validation");
const auth = require( "../util/authentication.js" );


router.get("/users/signup", userController.signup);

router.post("/users/signup", userController.signup);

router.get("/users/signin", userController.signin);

router.post("/users/signin", userController.signin);

router.get("/users/signout", userController.signout);

router.post("/users/signout", userController.signout);
