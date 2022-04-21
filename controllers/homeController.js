"use strict"
const {Course} = require("../models")
const { Op } = require("sequelize");
class HomeController{
    static home(req, res){
        // console.log(req.session,"aa");
        let id = req.session.iduser
        res.render("home", {id});
    }

    static courses(req, res){
        let role = req.session.roleuser
        let options = {
            where: {}
        }
        if (req.query.searchName) {
            options.where = {
                ...options.where,
                name: {
                    [Op.iLike]: `%${req.query.searchName}%`
                }
            }

        }
        if (req.query.searchDesc) {
            options.where = {
                ...options.where,
                description: {
                    [Op.iLike]: `%${req.query.searchDesc}%`
                }
            }
        }
        Course.findAll(options)
            .then(data => {
                res.render("courses", {data, role});

            })
            .catch(err => {
                res.render(err);
            })
    }
}

module.exports = HomeController