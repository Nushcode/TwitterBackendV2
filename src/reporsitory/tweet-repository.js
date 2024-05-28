import Tweet from '../model/tweet.js';
import CrudRepository from './crud-repository.js';

export class TweetRepository extends CrudRepository {
    constructor(){
        super(Tweet);
    }

    async delete(id) {
        try {
            return await Tweet.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error while deleting tweet with ID ${id}: ${error.message}`);
        }
    }

    async create(data) {
        try {
            return await Tweet.create(data);
        } catch (error) {
            throw new Error(`Error while creating tweet: ${error.message}`);
        }
    }

    async getWithComments(id) {
        try {
            return await Tweet.find({ 'comments.commentId': id });
        } catch (error) {
            throw new Error(`Error while fetching tweets with comment ID ${id}: ${error.message}`);
        }
    }
    async find(id){
        try {
            return await Tweet.findById(id).populate({path: 'likes'});
        } catch (error) {
            
        }
    }
}

export default TweetRepository;
