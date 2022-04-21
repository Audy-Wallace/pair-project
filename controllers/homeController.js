"use strict"
const {User, Course, User_Course} = require("../models")
const convertToRupiah = require("../helpers/convertToRp");
class HomeController{
    static home(req, res){
        const id = req.session.iduser;
        res.render("home", {id});
    }

    static courses(req, res){
        const role = req.session.roleuser;
        const userid = req.session.iduser;
        Course.findAll({
            include: {
                model : User
            }
        })
            .then(data => {
                res.render("courses", {data, convertToRupiah, role, userid});
            })
            .catch(err => {
                res.render(err);
            })
    }

    static buy(req, res){
        const CourseId = req.params.id
        User_Course.create({
            CourseId: +CourseId,
            UserId: req.session.iduser
        })
        .then(() => {
            res.redirect("/home/courses")
        })
        .catch((err) => {
            res.render(err);
        })
    }

    static addCourse(req, res){
        res.render("addPage");
    }

    static addToDB(req, res){
        const body = req.body;
        const {name, imageURL, description, price} = body
        console.log(body);
        Course.create({
            name:name,
            imageURL: imageURL,
            description: description,
            price: +price
        })
        .then(() => {
            res.redirect("/home/courses")
        })
        .catch((err) => {
            res.render(err);
        })
    }

    static editPage(req, res){
        const id = req.params.id
        Course.findAll({
            where: {id: +id}
        })
        .then((data) => {
            res.render("editPage", {data})
        })
        .catch((err) => {
            res.render(err);
        })
    }

    static editData(req, res){
        const body = req.body;
        const {name, imageURL, description, price} = body
        console.log(body);
        Course.update({
            name:name,
            imageURL: imageURL,
            description: description,
            price: +price
        },
        {
            where: {
                id: +req.params.id
            }
        })
        .then(() => {
            res.redirect("/home/courses")
        })
        .catch((err) => {
            res.render(err);
        })
    }

    static delete(req, res){
        const CourseId = req.params.id
        Course.destroy({
            where: {
                id: CourseId
            }
        })
        .then(() => res.redirect("/home/courses"))
        .catch(err => {
            res.render(err);
        })
    }
}

module.exports = HomeController