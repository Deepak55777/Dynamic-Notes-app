import express from 'express';
import * as z from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/userModel.js';


const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    try {
        const requireBody = z.object({
            username: z.string()
                .min(3, { message: 'Username must be at least 3 characters' })
                .max(20, { message: 'Username max 20 characters' }),
            email: z.email(),
            password: z.string()
                .min(6, { message: 'Password min 6 characters' })
                .max(20, { message: 'Password max 20 characters' })
        })

        const result = requireBody.safeParse(req.body)

        if (!result.success) {
            return res.status(411).json({
                message: "Validation Failed",
                error: result.error.message
            })
        }

        const { username, email, password } = result.data;

        const isExits = await UserModel.findOne({ email })

        //duplicate user check 
        if (isExits) {
            return res.status(403).json({
                message: "User already exits with this email"
            })
        }

        const hashPassword = await bcrypt.hash(password, 6)

        const user = await UserModel.create({
            username,
            email,
            password: hashPassword
        })

        res.status(200).json({
            message: "Signed up successfully",
            userId: user._id
        })

    } catch (error) {
        console.log("Signup error", error.message)

        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


authRouter.post('/signin', async (req, res) => {
    try {
        const requireBody = z.object({
            email: z.email(),
            password: z.string()
                .min(6, { message: 'Password min 6 characters' })
                .max(20, { message: 'Password max 20 characters' })
        })

        const result = requireBody.safeParse(req.body)

        if (!result.success) {
            return res.status(411).json({
                message: "Validation error",
                error: result.error.message
            })
        }

        const { email, password } = result.data;

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(403).json({
                message: "Invalid credentials"
            })
        }

        if (process.env.JWT_SECRET) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

            res.status(200).json({
                message: "Signup successfully",
                token: token
            })
        } else {
            return res.status(403).json({
                message: "JWT secret is missing"
            })
        }

    } catch (error) {
        console.log("Sign In error", error.message)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

export default authRouter