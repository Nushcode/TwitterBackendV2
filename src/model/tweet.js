import mongoose from 'mongoose';

const tweetschema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Tweet cannot be more than 250 characters']
    },
    image: {
        type: String,
    },
    likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]
    ,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

const Tweet = mongoose.model('Tweet', tweetschema);

export default Tweet;
