import { UserService } from "../services/user-service.js";

const userService = new UserService();

export const signUp = async(req,res) => {
    try {
        console.log(req.body);
        const response = await userService.signUp({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
        return res.status(201).json({
            success: true,
            message: "successfully created the user",
            data: response,
            err: []
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong in signup",
            data: {},
            err: error
        });
    }
}
export const login = async(req,res) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if(!user){
            return res.status(401).json({
                message: 'No user found',
                success: false
            })
        }
        if(!user.comparePassword(req.body.password)){
            return res.status(401).json({
                message: 'Incorrect password',
                success: false
            })
        } else {
            console.log(user);
            const token = user.genJWT();
            return res.status(200).json({
                message: 'Successfully logged In',
                success: true,
                data: token,
                err: {}
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            data: {},
            err: error
        });   
    }
}
