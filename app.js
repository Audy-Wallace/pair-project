const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/index')

app.use(express.urlencoded({extended:true}))
app.use("/home", require("./routes/home"))

app.set('view engine','ejs')
app.get('/', Controller.registerForm)
app.post('/', Controller.postRegister)
app.get('/login', Controller.loginForm)
app.post('/login', Controller.cekLogin)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})