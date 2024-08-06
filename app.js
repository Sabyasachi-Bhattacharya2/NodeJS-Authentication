import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';
import passport from 'passport';
import session from 'express-session';
import passportConfig from './config/passport.config.js';
import { connectUsingMongoose } from './config/mongoose.config.js';
import userRouter from './routes/user.routes.js';


const app = express();

//Middleware to parse Json and url requests
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', userRouter);
app.use('/', (req, res) => {
    res.render('home', {
        messages: req.flash('info')
    });
})

app.listen(4000, () => {
    console.log("Server listening at port 4000");
    connectUsingMongoose();
})