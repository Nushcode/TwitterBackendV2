import mongoose, { Schema, mongo } from 'mongoose';

const likeSchema = new mongoose.Schema({
    onModel : {
        type: String,
        required: true,
        enum: ['Tweet' , 'Comment']
    },
    likable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true});

const Like = mongoose.model('Like', likeSchema);

export default Like;
