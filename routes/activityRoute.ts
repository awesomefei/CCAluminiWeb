import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import Activity from '../model/activity';
import User from '../model/user';
import Message from '../model/message';
import * as mongodb from 'mongodb';

let activityRouter = express.Router();
let ObjectId = mongodb.ObjectID;

//populate all activities and bring it to view
activityRouter.get('/',(req,res)=>{
    Activity.find().sort('timeCreate').populate('userId')
    .then((activities)=>{
        res.send(activities);
    }).catch((err)=>{
        res.send(err)
    })
});

//get one activity
activityRouter.get('/:id', (req,res)=>{
    Activity.findById(req.params['id'])
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



activityRouter.put('/:id', authorize, (req,res)=>{
    Activity.findById(req.params['id'])
    .then((activity)=>{
        Activity.find({likes: req.user.id})
        .then((activity)=>{
            Activity.update( {_id: req.params['id']}, {$push: {likes: req.user.id}})
            .then((activity)=>{
                console.log('here')
                activity.likes++;
            }).catch(()=>{
                console.log('Updating like count has failed')
            })
        }).catch(()=>{
            console.log('Adding user to like array has failed')
        })
    }).catch(()=>{
        console.log('User has already liked')
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
