import express from 'express'
import userMiddleware from '../middleware/userMiddleware.js'
import ContentModel from '../models/contentModel.js'
import LinkModel from '../models/linkModel.js'
import randomHash from '../utils/randomString.js'
import UserModel from '../models/userModel.js'

const contentRouter = express.Router()

contentRouter.post('/content', userMiddleware, async (req, res) => {
    try {
        const { title, link, type } = req.body
        const userId = req.userId

        await ContentModel.create({
            link,
            type,
            title,
            userId,
            tags: []
        })

        res.status(200).json({
            message: "Content added Successfully"
        })


    } catch (error) {
        return res.status(402).json({
            message: "Content is not created",
            error: error
        })
    }

})

contentRouter.get('/content', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId

        const content = await ContentModel.find({ userId }).populate("userId", "username")

        if (content.length === 0) {
            return res.status(404).json({
                message: "Content not found"
            })
        }

        return res.status(200).json({
            content
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
})

contentRouter.put('/content/:id', userMiddleware, async (req, res) => {
    try {
        const contentId = req.params.id;
        const { title, link, type, tags } = req.body

        const updated = await ContentModel.findOneAndUpdate(
            { _id: contentId, userId: req.userId }, //filter
            { title, link, type, tags }, //updated body
            { new: true }, //return updated doc
            { runValidators: true } //enforce schema rules
        )

        if (!updated) {
            return res.status(401).json({
                message: "Content not updates or not authorized"
            })
        }

        return res.status(200).json({
            message: "Content updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

contentRouter.delete('/content/:id', userMiddleware, async (req, res) => {
    try {
        const contentId = req.params.id

        const deleted = await ContentModel.findOneAndDelete({
            _id: contentId,
            userId: req.userId
        })

        if (!deleted) {
            return res.status(404).json({
                message: "Content not found or not authorized"
            })
        }

        return res.status(200).json({
            message: "Content deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }

})

contentRouter.post('/content/share', userMiddleware, async (req, res) => {
    try {
        const share = req.body.share //boolean
        const hash = randomHash(10)

        if (share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userId
            });

            if (existingLink) {
                return res.status(200).json({
                    message: "sharable Link: " + existingLink.hash
                });
            }

            await LinkModel.create({
                userId: req.userId,
                hash: hash
            });

            return res.status(200).json({
                message: "sharable Link: " + hash
            });
        } else {
            await LinkModel.deleteOne({
                userId: req.userId
            });

            return res.status(200).json({
                message: "Removed link"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

contentRouter.get('/content/:shareLink', async (req, res) => {
    try {
        const hash = req.params.shareLink;

        // 1. Find link and populate user data directly in one step
        const link = await LinkModel.findOne({ hash }).populate('userId', 'username');

        if (!link) {
            return res.status(411).json({
                message: "Sorry, incorrect input"
            });
        }

        const user = link.userId;

        // Check if the user was somehow deleted but their link remains
        if (!user) {
            return res.status(411).json({
                message: "User not found, error should ideally not happen"
            });
        }

        // 2. Fetch the content related to the user's ID
        // Note: No need to populate userId on ContentModel anymore since we already have the username
        const content = await ContentModel.find({
            userId: user._id
        });

        res.status(200).json({
            username: user.username,
            content: content
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default contentRouter