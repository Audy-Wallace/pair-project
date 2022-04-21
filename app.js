const express = require('express')
const session = require('express-session')
const Controller = require('./controllers/index')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(session({
  secret: 'yang tau aja', //untuk mengamankan session kita (wajib ada)
  resave: false, //untuk  tidak menyimpan perubahan email / uname dri user 
  saveUninitialized: false, 
  cookie: { 
    secure: false,
    sameSite: true 
  } 
}))

app.get('/', Controller.registerForm)
app.post('/', Controller.postRegister)
app.get('/login', Controller.loginForm)
app.post('/login', Controller.cekLogin)

app.use("/home", require("./routes/home"))

app.get('/logout', Controller.logOut)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})