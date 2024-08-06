import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { userSchema } from "./user.schema.js";



const UserModel = mongoose.model('User', userSchema);

export default class UserRepository {
    async register(name, email, password) {
        const findUser = await UserModel.findOne({email: email});
        if(findUser) {
            return "failure";
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        return newUser;
    }

    async signin(email, password) {
        const findUser = await UserModel.findOne({email: email});
        if (!findUser) {
            return null; 
        }
        const checkPass = await bcrypt.compare(password, findUser.password);
        if(checkPass) {
            return findUser;
        }
        return null;

    }

    async changePass(email, password) {
        try {
            const findUser = await UserModel.findOne({email: email});
            console.log(findUser);
            if(!findUser) {
                return null;
            }
            const newPass = await bcrypt.hash(password, 10);
            findUser.password = newPass;
            await findUser.save();
            return "Password Updated";
        } catch(err) {
            console.log(err);
        }
    }

    async findById(id) {
        return await UserModel.findById(id);
    }
}