import passport from "passport";
import { Strategy as LocalStrategy} from "passport-local";
import UserRepository from "../models/user.repository.js";

const userRepository = new UserRepository();

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) => {
    const authLoginUser = await userRepository.signin(email, password);
    if(!authLoginUser) {
        return done(null, false, {message: 'Invalid Credentials'});
    }
    return done(null, authLoginUser);
}));

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user._id);
});

passport.deserializeUser(async(id, done) => {
    console.log('Deserializing user ID:  '+ id);
    const user = await userRepository.findById(id);
    if(!user) {
        return done(new Error('User Not Found'));
    }
    done(null, user);
}) ;

export default passport;