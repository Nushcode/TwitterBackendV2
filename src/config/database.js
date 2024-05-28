import mongoose from 'mongoose';

export const connect = async () => {
    console.log("Connect is a fucntion")
    await mongoose.connect('mongodb://localhost:27017/TwitterBackend');
};

