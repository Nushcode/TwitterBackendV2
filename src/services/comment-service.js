import Comment from "../model/comment.js";
import CommentRepository from "../reporsitory/comment-repository.js";
import TweetRepository from "../reporsitory/tweet-repository.js";

export class CommentService {
    constructor(){
        this.commentRepo = new CommentRepository();
        this.tweetRepo = new TweetRepository();
    }

    async create(modelId, modelType, userId, content) {
        let commentable;
        if (modelType === 'Tweet') {
            commentable = await this.tweetRepo.get(modelId);
        } else if (modelType === 'Comment') {
            commentable = await this.commentRepo.get(modelId);
        } else {
            throw new Error('Unknown Model Type');
        }
        const comment = await this.commentRepo.create({
            content: content,
            userId: userId,
            onModel: modelType,
            commentable: modelId,
            comments:[]
        })
        commentable.comments.push(comment);
        await commentable.save();
        return comment;
    }    
}

export default CommentService;