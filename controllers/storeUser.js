// ป้องกันการไม่ใส่ข้อมูล

const User = require('../models/User')

module.exports = (req, res) => {
    User.create(req.body).then(() => {
        console.log("User register successfully!")
        rea.redirect('/')
    }).catch((error) => {
        if (error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors',validationErrors)
            req.flash('data', req.body)
            return res.redirect('/register')
        }
    })
}