const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

// Connect MongoDB
mongoose.connect('mongodb+srv://noobboy:Dragon_Killer@cluster0.kuhyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true
})

const indexcontro = require('./controllers/indexcontro') //Objectเก็บหน้าแรก
const logincontro = require('./controllers/logincontro') //Objectเก็บหน้า log-in
const registercontro = require('./controllers/registercontro') //Objectเก็บหน้า register
const storecontro = require('./controllers/storeUser') //Objectเก็บการป้องกันการไม่ใส่ข้อมูล


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())

app.use(expressSession({
    secret:"node secret"
}))

app.set('view engine','ejs')



app.get('/',indexcontro) //เรียกใช้หน้า register
app.get('/login',logincontro) //เรียกใช้หน้า register
app.get('/register',registercontro) //เรียกใช้หน้า register
app.post('/user/register',storecontro)//เรียกใช้การป้องกันการไม่ใส่ข้อมูล


app.listen(4000,() => {
    console.log("\n running port 4000 pass \n")
})