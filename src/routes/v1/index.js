import express from 'express';
import { createTweet } from '../../controllers/tweet-controller.js';
import { toggleLike } from '../../controllers/like-controller.js';
import { createComment } from '../../controllers/comment-controller.js';
import { login, signUp } from '../../controllers/auth-controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import upload from '../../config/s3-config.js';

const v1Routes = express.Router();

v1Routes.post('/tweets', upload.single('image') , authenticate,createTweet);

v1Routes.post('/signup', signUp);

v1Routes.post('/login',login);

v1Routes.post('/likes/toggle',toggleLike);

v1Routes.post('/Comments',authenticate , createComment)

export { v1Routes }; 