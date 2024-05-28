import express from 'express';
import { connect } from './src/config/database.js';
import router from './src/routes/index.js';
import passport from 'passport';

import apiRoutes from './src/routes/index.js';

const app = express();

import { TweetRepository } from './src/reporsitory/tweet-repository.js';
import { TweetService } from './src/services/tweet-service.js';
import UserRepository from './src/reporsitory/user-repository.js';
import { LikeService } from './src/services/like-service.js';
import passportAuth from './src/config/jwt-middleware.js'

app.use(passport.initialize());
passportAuth(passport);

app.use(express.json());
app.use('/api',router);



app.listen(8000, async () => {
    console.log('Server connected');
    await connect();
    console.log('Connection successful');
    const tweetService = new TweetService();
});