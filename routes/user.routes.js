import express from 'express';
import passport from 'passport';
import UserRepository from '../models/user.repository.js';
import UserController from '../controllers/user.controller.js';
import { ensureAuthenticated } from '../config/auth.config.js';


const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/register', (req, res) => {
    userController.registerPage(req, res);
});

userRouter.get('/login', (req, res) => {
    userController.loginPage(req, res);
});

userRouter.get('/dashboard', ensureAuthenticated,(req, res) => {
    userController.dashboardPage(req, res);
});

userRouter.get('/change-password', ensureAuthenticated,(req, res) => {
    userController.changePasswordPage(req, res);
})

userRouter.post('/register', (req, res) => {
    userController.userRegister(req, res);
});

userRouter.post('/login', passport.authenticate('local', {
    failureRedirect:'/auth/login',
    failureFlash: true
}), (req, res) => {
    userController.userSigin(req, res);
});

userRouter.post('/change-password', ensureAuthenticated, (req, res) => {
    userController.changePassword(req, res);
});


export default userRouter;