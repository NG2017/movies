const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const movieController = require("../controllers/movie.controller");
const Validator = require("../middleware/validateUser")

//át kell nézni, mi get, mi post...
router.get("/movie/find-by-id/:id", movieController.findById);
router.get("/movie/find-by-title/:title", movieController.findByTitle);

//ez post legyen ám!!
router.post("/google-login", userController.googleLogin);
router.post("/validate", Validator, userController.sendUserDataToFE);




module.exports = router;
