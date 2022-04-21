"use strict"
const HomeController = require("../controllers/homeController")
const express = require("express");
const router = express.Router();

router.get("/", HomeController.home);
router.get("/courses", HomeController.courses);
router.get("/courses/:id", HomeController.user);

module.exports = router;