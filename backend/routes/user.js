const express = require("express")
const zod = require("zod")
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken")
const { authMiddleware } = require("../middleware");
const { JWT_SECRET } = require("../config");
const userRouter = express.Router();
const signupSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

userRouter.get("/name",authMiddleware,async (req,res) => {
    const user = await User.findOne({
        _id : req.userId,
    })
    res.json({
        firstName: user.firstName
    })
})

userRouter.post("/signup",async (req,res) => {
    const createPayLoad = req.body;
    const parsedPayLoad = signupSchema.safeParse(createPayLoad);
    if(!parsedPayLoad){
        return res.status(411).json({
            msg: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            msg: "Email already taken"
        })
    }
    
    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })
    
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        msg: "User created successfully",
        token: token
    })
})

userRouter.post("/signin",async (req,res) => {
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET)
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        msg: "Error while logging in"
    })
})
const updateInfo = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

userRouter.put("/",authMiddleware,async (req,res) => {
    const {success} = updateInfo.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg: "Error while updating info"
        })
    }
    await User.updateOne(req.body,{
        id: req.userId
    })
    res.json({
        msg: "Updated successfully"
    })
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter;