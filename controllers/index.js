
class Controller {

    static registerForm(req,res){
        res.render('register.ejs')
    }
    static loginForm(req,res){
        res.render('login.ejs')
    }
}
module.exports = Controller