import * as express from 'express';
import * as mongodb from "mongodb";
import * as jwt from 'jsonwebtoken'
import User from '../model/user';
import Message from '../model/message'

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
    Message.findById(req.params['id']).populate('userSend userRecieve')
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
