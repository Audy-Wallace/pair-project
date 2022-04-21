const {UserIdentity, User} = require('../models')
const bcrypt = require('bcryptjs')

class Controller {

    static registerForm(req,res){
        res.render('register.ejs')
    }
    static loginForm(req,res){
        res.render('login.ejs')
    }

    static postRegister(req,res){
        // console.log(req.body);
        const {email,password,dateOfBirth,gender,firstName,lastName} = req.body
        User.create({
            email: email,
            password: password
        })
        .then(data=>{
            // console.log(data);
            return UserIdentity.create({
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                gender: gender,
                UserId: data.id
            })
            .then(data2=>{
                res.redirect('/login')
            })
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    }

    static cekLogin(req,res){       
        const {email, password} = req.body
        User.findOne({
            where:{
                email: email
            }
        })
        .then(user=>{
            if(user){
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if(isValidPassword) {
                    return res.send('email dan password muasok')
                } else {
                    return res.send('email dan password gak cocok boz')
                }
            }
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    }

}
module.exports = Controller