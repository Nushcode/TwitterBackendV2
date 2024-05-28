import mongoose from 'mongoose';

const hashtagschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }]
}, { timestamps: true });

const Hashtags = mongoose.model('Hashtags', hashtagschema);

export default Hashtags;
