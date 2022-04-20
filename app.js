const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/index')

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.get('/', Controller.registerForm)
app.get('/login', Controller.loginForm)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})