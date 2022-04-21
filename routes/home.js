"use strict"
const HomeController = require("../controllers/homeController")
const express = require("express");
const router = express.Router();

router.get("/", HomeController.home);

    router.use((req, res, next) => {
        console.log(req.session)
        if(!req.session.iduser){
            let errors = 'Login dulu ya'
            res.redirect(`/login?errors=${errors}`)
        } else {
            next()
        }
      })
      
router.get("/courses", HomeController.courses);

module.exports = router;