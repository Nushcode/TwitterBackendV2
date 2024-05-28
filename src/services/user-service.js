import UserRepository from "../reporsitory/user-repository.js";

export class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(data){
        try {
            return await this.userRepository.create(data);
        } catch (error) {
            throw error;
        }
    }
    async getUserByEmail(email){
        try {
            const user = await this.userRepository.findBy({email});
            return user;
        } catch (error) {
            throw error;
        }
    }
}
