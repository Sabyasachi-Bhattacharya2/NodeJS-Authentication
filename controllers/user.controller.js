import UserRepository from "../models/user.repository.js";




export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }
    async userRegister(req, res) {
        const {name, email, password} = req.body;
        const result = await this.userRepository.register(name, email, password);
        if(result == 'failure') {
            return res.status(400).send('User exits! try login');
        }
        res.status(201).send('user registered successfully');
    }

    async userSigin(req, res) {
        const {email, password} = req.body;
        const user = await this.userRepository.signin(email, password);
        if(!user) {
            req.flash('error', 'Invalid Credentials');
            return res.redirect('/auth/login');
        }
        req.flash('success', 'Login Successful!');
        res.redirect('/auth/dashboard');
    }

    async dashboardPage(req, res) {
        res.render('dashboard', {user: req.user});
    }

    async loginPage(req, res) {
        res.render('login');
    }

    async registerPage(req, res) {
        res.render('register');
    }

    async changePasswordPage(req, res) {
        res.render('changepass');
    }

    async changePassword(req, res) {
        const {email, newPassword} = req.body;
        const result = await this.userRepository.changePass(email, newPassword);
        if (result == 'Password Updated') {
            req.flash('success', 'Password updated successfully');
        } else {
            req.flash('error', 'Failed to update password');
        }
        res.redirect('/auth/login');
    }
}