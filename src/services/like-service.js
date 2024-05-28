import { model } from "mongoose";
import LikeRepository from "../reporsitory/like-repository.js";
import TweetRepository from "../reporsitory/tweet-repository.js";
import CommentRepository from "../reporsitory/comment-repository.js";

export class LikeService {
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId , modelType, userID){
        if(modelType == 'Tweet'){
            var likable = await this.tweetRepository.find(modelId);
        }else if(modelType='Commet'){
            var likable = await this.commentRepository.find(modelId);
        }else{
            throw new Error('Unknown Model Type');
        }
        const exists = await this.likeRepository.findByUserAndLikable({
            user: userID,
            onModel : modelType,
            likable : modelId
        })
        if(exists){
            likable.likes.pull(exists.id);
            await likable.save();
            await exists.remove();
        }else{
            const newLike = await this.likeRepository.create({
                user: userID,
                onModel : modelType,
                likable : modelId 
            })
            likable.likes.push(newLike);
        }
        return true;
    }
}
