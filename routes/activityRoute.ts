import * as mongoose from 'mongoose';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import Activity from '../model/activity';
import User from '../model/user';
import Message from '../model/message';
import Comment from '../model/comments';
import * as mongodb from 'mongodb';
import mongooseDeepPopulate from 'mongoose-deep-populate';

let deepPopulate = mongooseDeepPopulate(connection)

let activityRouter = express.Router();
let ObjectId = mongodb.ObjectID;

//populate all activities and bring it to view
activityRouter.get('/',(req,res)=>{
    Activity.find().sort('timeCreate').populate('userId comments')
    .then((activities)=>{
        res.send(activities);
    }).catch((err)=>{
        res.send(err)
    })
});

//get one activity
activityRouter.get('/:id', (req,res)=>{
    Activity.findById(req.params['id']).populate('userId comments userSend')
    .then((activity)=>{
        res.send(activity);
    }).catch((err)=>{
        res.send(err);
        console.log('activity post not found')
    })
})

//Make a post and and save your activity status
activityRouter.post('/', authorize, (req,res)=>{
    let activity = new Activity();

    activity.userId = req.user.id;
    activity.message = req.body.message;
    activity.timeCreate = new Date();
    activity.likeCount = 0;

    activity.save()
    .then((activity)=>{
        res.send(activity);
        console.log("Post Saved")
    }).catch((err)=>{
        res.status(400).send(err)
    })
});

// Activity.update({_id: req.params['id']}, {$push: {activities: activity._id}})

//Make a comment on the activity
activityRouter.post('/saveComment/:id', authorize, (req,res)=>{
    let comment = new Comment();

    comment.userSend = req.user.id;
    comment.message = req.body.message;
    comment.timeCreate = new Date();

    comment.save()
    .then((comment)=>{
        Activity.update({_id: req.params['id']}, {$push: {comments: comment._id}})
        .then((activity)=>{
            res.send(activity)
            console.log('comment made')
        }).catch((err)=>{
            res.send(err)
        })
    }).catch((err)=>{
        res.status(400).send(err)
    })
});

activityRouter.put('/:id', authorize, (req,res)=>{
    Activity.findOne({_id: req.params['id']})
    .then((activity)=>{
        if(activity.likes.indexOf(req.user.id)==-1){
            Activity.update({_id: req.params['id']}, {$push: {likes: req.user.id}})
            .then((activity)=>{
                console.log(activity)
                res.send(activity)
            }).catch(()=>{
                console.log('Something went wrong')
            })
        } else {
            console.log('Search failed')
        }
    }).catch(()=>{
        console.log('Activity not found')
    })
})

function authorize(req, res, next){

    let token = req['token'];

    jwt.verify(token, 'SuperSecret', function(err,decoded){
        if(err){
            res.sendStatus(401)
        } else {
            req.user = decoded;
            next();
        }
    })
};

export default activityRouter;
