import User from "../models/user";
import { UserServices } from "../services/userServices";

export class UserController {


    constructor() {

    }


    async createUser(req, res, next) {

        try {
            const user = await new User({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            })
            await UserServices.createUser(user)
            res.send(user)
        } catch (error) {
            res.status(500)
            res.send({
                error: 'User already exist'
            })
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await UserServices.getAllUsers()
            res.send(users)
        } catch (error) {
            console.log(error);
        }

    }
    async getUser(req, res, next) {
        try {
            const user = await UserServices.getUser(req.params.id)
            res.send(user)
        } catch (error) {
            console.log(error);
        }
    }
    updateUser(req, res, next) {}
    deleteUser(req, res, next) {}
}