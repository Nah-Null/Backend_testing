const User = require('../models/User');

module.exports = (req, res) => {
    User.create(req.body)
        .then(() => {
            console.log("User registered successfully!");
            res.redirect('/'); // แก้จาก rea.redirect เป็น res.redirect
        })
        .catch((error) => {
            if (error) {
                // ตรวจสอบว่า error มี validation errors หรือไม่
                const validationErrors = Object.keys(error.errors || {}).map(
                    key => error.errors[key].message
                );
                // ใช้ flash เพื่อเก็บข้อมูล error และ data ที่ผู้ใช้ป้อน
                req.flash('validationErrors', validationErrors);
                req.flash('data', req.body);
                return res.redirect('/register');
            }
        });
};
