const { UserIdentity, User } = require('../models')
const bcrypt = require('bcryptjs')

class Controller {

    static registerForm(req, res) {
        res.render('register.ejs')
    }
    static loginForm(req, res) {
        let errors = req.query.errors
        res.render('login.ejs', {errors})
    }

    static postRegister(req, res) {
        // console.log(req.body);
        const { email, password, dateOfBirth, gender, firstName, lastName } = req.body
        User.create({
            email: email,
            password: password
        })
            .then(data => {
                // console.log(data);
                return UserIdentity.create({
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    UserId: data.id
                })
                    .then(data2 => {
                        res.redirect('/login')
                    })
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

    static cekLogin(req, res) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if (isValidPassword) {   
                        // Case saat berhasil login
                        req.session.iduser = user.id //set session 
                        req.session.roleuser = user.role //set role
                        res.redirect('/home')
                    } else {
                        let errors = 'Invalid username/password'
                        return res.redirect(`/login?errors=${errors}`)
                        // return res.send('email dan password gak cocok boz')
                    }
                } else {
                    let errors = 'Invalid username/password'
                    return res.redirect(`/login?errors=${errors}`)
                //   return  res.send('E-mail belom terdaftar')
                }
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }

        static logOut(req,res){

            
        }

}
module.exports = Controller