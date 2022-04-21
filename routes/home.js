"use strict"
const HomeController = require("../controllers/homeController")
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    console.log(req.session)
    if(!req.session.iduser){
        let errors = 'Login dulu ya'
        res.redirect(`/login?errors=${errors}`)
    } else {
        next()
    }

})

router.get("/", HomeController.home);

router.get("/courses", HomeController.courses);
router.get("/courses/add", HomeController.addCourse);
router.post("/courses/add", HomeController.addToDB);
router.get("/courses/edit/:id", HomeController.editPage);
router.post("/courses/edit/:id", HomeController.editData);

router.get("/courses/buy/:id", HomeController.buy);
router.get("/courses/delete/:id", HomeController.delete);

module.exports = router;