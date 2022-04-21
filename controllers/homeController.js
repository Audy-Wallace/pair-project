"use strict"
const {User, Course} = require("../models")
const convertToRupiah = require("../helpers/convertToRp");
class HomeController{
    static home(req, res){
        res.render("home");
    }

    static courses(req, res){
        Course.findAll()
            .then(data => {
                res.render("courses", {data, convertToRupiah});

            })
            .catch(err => {
                res.render(err);
            })
    }

    static user(req, res){
        const id = +req.params.id;
        const output = {convertToRupiah}
        Course.findAll()
            .then((data) => {
                output.data = data
                return User.findAll({where: {id: id}})
            })
            .then((data) => {
                output.user = data
                res.render("user", output);
            })
            .catch(err => {
                res.render(err);
            }) 
    }
}

module.exports = HomeController