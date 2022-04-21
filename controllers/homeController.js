"use strict"
const {Course} = require("../models")
class HomeController{
    static home(req, res){
        // console.log(req.session,"aa");
        let id = req.session.iduser
        res.render("home", {id});
    }

    static courses(req, res){
        let role = req.session.roleuser
        Course.findAll()
            .then(data => {
                res.render("courses", {data, role});

            })
            .catch(err => {
                res.render(err);
            })
    }
}

module.exports = HomeController