import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import Activity from '../model/activity';
import User from '../model/user';

let activityRouter = express.Router();

activityRouter.get('/',(req,res)=>{
    Activity.find().sort('timeCreate').populate('userId')
    .then((activities)=>{
        res.send(activities);
    }).catch((err)=>{
        res.send(err)
    })
});

activityRouter.post('/', authorize, (req,res)=>{
    let activity = new Activity();

    activity.userId = req.user.id;
    activity.message = req.body.message;
    activity.timeCreate = new Date();
    activity.likes = 0;

    activity.save()
    .then((activity)=>{
        res.send(activity);
        console.log("Post Saved")
    }).catch((err)=>{
        res.status(400).send(err)
    })
});



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
