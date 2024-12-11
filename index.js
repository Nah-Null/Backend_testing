const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Pu:12345@cluster0.oncuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true, // เพิ่มเพื่อป้องกัน warning
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Import controllers
const indexcontro = require('./controllers/indexcontro'); // หน้าแรก
const logincontro = require('./controllers/logincontro'); // หน้า log-in
const registercontro = require('./controllers/registercontro'); // หน้า register
const storecontro = require('./controllers/storeUser'); // การป้องกันการไม่ใส่ข้อมูล

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ปรับเพิ่มเพื่อแก้การ warning
app.use(expressSession({
    secret: "node secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

// Flash middleware for EJS
app.use((req, res, next) => {
    res.locals.validationErrors = req.flash('validationErrors');
    res.locals.data = req.flash('data');
    next();
});

// Set EJS as view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', indexcontro); // หน้าแรก
app.get('/login', logincontro); // หน้า log-in
app.get('/register', registercontro); // หน้า register
app.post('/user/register', storecontro); // การป้องกันการไม่ใส่ข้อมูล

// Start server
app.listen(4000, () => {
    console.log("\nServer running on port 4000\n");
});
