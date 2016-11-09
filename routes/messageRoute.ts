import * as express from 'express';
import * as mongodb from "mongodb";
import * as jwt from 'jsonwebtoken'
import User from '../model/user';
import Message from '../model/message';
import Activity from '../model/activity';
import Comment from '../model/comments';
import Notification from '../model/notification';

let messageRouter = express.Router();
let ObjectId = mongodb.ObjectID;

//read message
messageRouter.get('/', authorize, (req,res)=>{

    Message.find({userRecieve: req.user.id}).populate('userSend userRecieve')
    .then((messages)=>{
        res.send(messages)
    }).catch((err)=>{
        res.send(err);
    })
})

messageRouter.get('/', (req,res)=>{
    Message.find().then((messages)=>{
        res.send(messages)
    }).catch((err)=>{
        res.send(err)
    })
})

messageRouter.get('/:id', (req,res)=>{
    Message.findById(req.params['id']).populate('userSend userRecieve comments')
    .then((message)=>{
        res.send(message)
    }).catch((err)=>{
        res.send(err)
    });
})

//create messageRouter
messageRouter.post('/:recieverId', authorize, (req,res)=>{


    let message = new Message();

    message.userSend = req.user.id;
    message.userRecieve = req.params['recieverId'];
    message.title = req.body.title;
    message.message = req.body.message;
    message.timeCreate = new Date();

    message.save()
    .then((message)=>{
        res.send(message);
        console.log("Message was saved")
    }).catch((err)=>{
        res.status(400).send(err)
    })
});

//Reply to a message
messageRouter.post('/saveComment/:id', authorize, (req,res)=>{
    let comment = new Comment();

    comment.userSend = req.user.id;
    comment.message = req.body.message;
    comment.timeCreate = new Date();

    comment.save()
    .then((comment)=>{
        Message.update({_id: req.params['id']}, {$push: {comments: comment._id}})
        .then((message)=>{
            res.send(message)
        }).catch((err)=>{
            res.send(err)
        })
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

//reply to message
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
}

export default messageRouter;
