const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/index')

app.use(express.urlencoded({extended:true}))
app.use("/", require("./routes/index"))
app.use("/home", require("./routes/home"))
app.use("/login", require("./routes/login"))
app.use("/register", require("./routes/register"))

app.set('view engine','ejs')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})