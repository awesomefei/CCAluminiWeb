import * as express from 'express';
import * as mongodb from 'mongodb';
import User from '../../model/user';
import Answer from '../../model/answer';


let answerRouter = express.Router();
let ObjectId = mongodb.ObjectID;

answerRouter.get('/', (req, res) =>{
    console.log('!!!!!!!!!!!get');
    Answer.find()
    .populate('users')
    .then((answers) =>{
        res.send(answers);
    }).catch(() =>{
        res.sendStatus(500);
    })
})

answerRouter.post('/', (req, res) =>{
    let answer = new Answer();
    answer.text = req.body.text;
    answer.timeCreate = new Date();
    answer.save()
    .then((answer) =>{
        res.send(answer);
    })
    .catch((err) =>{
        res.send(err);
    })

})
export default answerRouter;
