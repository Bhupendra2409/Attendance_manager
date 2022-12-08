const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');
const Attendance = require('../models/Attendance')
const Request = require('../models/Request')
const User = require('../models/User')


router.post('/createrequest', async (req, res, next) => {

    const newRequest = new Request(req.body);
    
    try {
        const alreadyPresent = await Request.findOne({orgId:req.body.orgId,date:req.body.date})

        if(alreadyPresent) res.status(200).json(alreadyPresent);
        else{
            const savedRequest = await newRequest.save();
            res.status(200).json(savedRequest);
        }
    }
    catch (err) {
        next(err);
    }
})

//update a post
router.put('/denyrequest', async (req, res, next) => {

    try {
        const request = await Request.findById(req.body.requestId);
        const user = await User.findById(req.body.userId);

        if (user.isAdmin) {
            // await post.updateOne({$set:req.body});

            if (!request) return next(new ErrorResponse("Invalid requestId", 404));

            await request.deleteOne();
            res.status(200).json("The request has been denied");
        } else {
            return next(new ErrorResponse("You are not authorized", 403));
        }
    } catch (err) {
        next(err);
    }

})

router.put('/approverequest', async (req, res, next) => {

    try {
        const request = await Request.findById(req.body.requestId);
        const user = await User.findById(req.body.userId);

        if (user.isAdmin) {
            const orgId = request.orgId
            const date = request.date
            const name = request.name
            const newAttendance = new Attendance({ name, orgId, date });

            const savedAttendance = await newAttendance.save();

            await request.deleteOne();
            res.status(200).json(savedAttendance);
        } else {
            return next(new ErrorResponse("You are not authorized", 403));
        }
    } catch (err) {
        next(err);
    }

})

// get a request
router.get("/request/:id", async (req, res, next) => {
    try {
        
            const request = await Request.findById(req.params.id);
            res.status(200).json(request);
        
    }
    catch (err) {
        next(err);
    }
})

//get all request
router.get("/requests/:id", async (req, res, next) => {
    try {
        // console.log(req.body,"this is body");
        const user = await User.findById(req.params.id);
        if (user.isAdmin) {
            const requests = await Request.find();
            res.status(200).json(requests);
        } else {
            return next(new ErrorResponse("You are not authorized", 403));
        }
    }
    catch (err) {
        next(err);
    }
})

// get attendance of a user by orgId
router.get("/orgid/:id", async (req, res, next) => {
    try {
        const attendance = await Attendance.find({ orgId: req.params.id });
        res.status(200).json(attendance);
    }
    catch (err) {
        next(err);
    }
})

router.post("/today", async (req, res, next) => {
    try {
        const attendance = await Attendance.findOne({ orgId: req.body.orgId,date: req.body.date });
        // const attendance = null
        if(attendance)
        res.status(200).json({present:true});
        else
        res.status(200).json({present:false});
    }
    catch (err) {
        next(err);
    }
})

// // like/unlike a post
// router.put('/:id/like',async (req,res,next)=>{

//     try{
//         const post = await Attendance.findById(req.params.id);
//         if(!post.likes.includes(req.body.userId)){
//             await post.updateOne({$push:{likes:req.body.userId}});
//             res.status(200).json("post has been liked");
//         }else{
//             await post.updateOne({$pull:{likes:req.body.userId}});
//             res.status(200).json("post has been unliked");
//         }
//     }catch(err){
//         next(err);
//     }

// })
//delete a post
// router.delete('/:id',async (req,res,next)=>{

//     try{
//         const post = await Attendance.findById(req.params.id);
//         if(post.userId === req.body.userId){
//             await post.deleteOne();
//             res.status(200).json("The post has been deleted");
//         }else{
//             return next(new ErrorResponse("You can only delete your Attendance",403));
//         }
//     }catch(err){
//         next(err);
//     }

// })

//get a post
// router.get("/:id", async(req,res,next)=>{
//     try{
//     const post =await Attendance.findById(req.params.id) ;
//     res.status(200).json(post);
//     }
//     catch(err){
//         next(err);
//     }
// })
//get timeline Attendance
// router.get("/timeline/:userId",async (req,res,next)=>{

//     try{
//         const currentUser = await User.findById(req.params.userId);
//         const userAttendance = await Attendance.find({userId: currentUser._id});
//         const friendAttendance = await Promise.all(
//             currentUser.followings.map(friendId=>{
//                return Attendance.find({userId:friendId});
//             })
//         )
//         res.status(200).json(userAttendance.concat(...friendAttendance))
//     }catch(err){
//         next(err);
//     }
// })

//get user's all Attendance
// router.get("/profile/:username",async (req,res,next)=>{

//     try{
//         const user = await User.findOne({username:req.params.username});
//         const post = await Attendance.find({userId:user._id});
//         console.log(post);
//         res.status(200).json(post);

//     }catch(err){
//         return next(new ErrorResponse("No Attendance found",403));
//     }
// })

module.exports = router;