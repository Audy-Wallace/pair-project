"use strict"
const {Course} = require("../models")
class HomeController{
    static home(req, res){
        res.render("home");
    }

    static courses(req, res){
        Course.findAll()
            .then(data => {
                res.render("courses", {data});

            })
            .catch(err => {
                res.render(err);
            })
    }
}

module.exports = HomeController