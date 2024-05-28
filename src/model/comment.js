import mongoose, { Schema, mongo } from 'mongoose';

const commentSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    onModel : {
        type: String,
        required: true,
        enum: ['Tweet' , 'Comment']
    },
    commntable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Comment'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
