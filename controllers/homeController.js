"use strict"

class HomeController{
    static home(req, res){
        res.render("home");
    }

    static courses(req, res){

        res.render("courses");
    }
}

module.exports = HomeController