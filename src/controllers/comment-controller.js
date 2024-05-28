import CommentService from "../services/comment-service.js";

export const createComment = async (req, res) => {
    try {
        const response = await CommentService.create(req.query.modelId, req.query.modelType , req.body.userId, req.body.content);
        return res.status(201).json({
            success: true,
            message: "successfully create the commet",
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
