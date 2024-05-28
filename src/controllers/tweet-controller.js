import { TweetService } from "../services/tweet-service.js";
import upload from "../config/s3-config.js"

const uploader = upload.single('image');

const tweetService = new TweetService(); 
export const createTweet = async (req, res) => {
    try {
        // uploader(req,res,  async function(err,data){
        //     if(err){
        //         return res.status(500).json({
        //             success: false,
        //             message: "something went wrong",
        //             err: err
        //         });
        //     }
        //     console.log(req.file);
        // })
        console.log(req.file.location)
        const response = await tweetService.create({...req.body , image:req.file.location});

        return res.status(201).json({
            success: true,
            message: "successfully create the tweet",
            data: response,
            err: []
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            data: {},
            err: error
        });
    }
};
