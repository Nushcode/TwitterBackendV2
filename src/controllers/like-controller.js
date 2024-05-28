import { LikeService } from "../services/like-service.js";

const likeServive  = new LikeService()

export const toggleLike = async (req, res) => {
    try {
        const response = await likeServive.toggleLike(req.query.modelId, req.query.modelType , req.body.userId);
        return res.status(201).json({
            success: true,
            message: "successfully create the tweet",
            data: response,
            err: []
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
            data: {},
            err: error
        });
    }
};