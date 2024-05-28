import Like from "../model/like.js";
import CrudRepository from "./crud-repository.js";

class LikeRepository extends CrudRepository{
    constructor(){
        super(Like);
    }

    async findByUserAndLikable(data){
        try {
            return Like.findOne(data);
        } catch (error) {
            console.log('Something went wrong with the find by user and likable');
        }
    }
}

export default LikeRepository;