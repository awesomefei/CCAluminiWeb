import * as express from 'express';
import * as mongodb from "mongodb";
import * as jwt from 'jsonwebtoken'
import User from '../model/user';
import Message from '../model/message'

let messageRouter = express.Router();

//create messageRouter
messageRouter.post('/', (req,res)=>{
    let message = new Message();

    
})
