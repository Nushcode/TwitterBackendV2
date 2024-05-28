import User from "../model/users.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }
    async create(data) {
        try {
            return await User.create(data);
        } catch (error) {
            throw error;
        }
    }
    async findBy(data){
        try {
            return await User.findOne(data);
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;