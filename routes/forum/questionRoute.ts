import * as express from 'express';
import * as mongodb from 'mongodb';
import Question from '../../model/question';
import Answer from '../../model/answer';
import User from '../../model/user';

let questionRouter = express.Router();
let ObjectId = mongodb.ObjectID;

questionRouter.get('/', (req, res) =>{
    Question.find()
    .populate('users tags')
    .then((questions)=>{
        res.send(questions);
    }).catch(()=>{
        res.sendStatus(500);
    })
});

questionRouter.get('/:id', (req,res)=>{
    console.log('!!!!!!!req ' + req.params['id']);

    Question.findById(req.params['id'])
    .populate(' users tags')

    .then((question)=>{
        console.log('!!!!!!!question ' + question);
        res.send(question);
    }).catch((err) =>{
        console.log('!!!!!!!err ' + err);
        res.send(err);
    })
});
questionRouter.put('/', (req, res) =>{
    Question.findByIdAndUpdate(req.body._id, req.body)
    .then((question) =>{
        res.status(201).send(question);
    })
    .catch((err) =>{
        res.status(404).send({err:err});
    });
})

questionRouter.post('/', (req, res) =>{
    let question = new Question();
    question.title=req.body.title;
    question.timeCreate = new Date();
    question.text=req.body.text;
    question.voteCount=0;
    question.answerCount = 0;

    question.save()
    .then((question) =>{
        res.send(question);
    }).catch((err) =>{
        res.send(err);
    })
});
questionRouter.post('/addTag/:questionId', (req, res) =>{
    let questionId= new ObjectId(req.params['questionId']);
    let tagId = new ObjectId(req.body.tagId);
    Question.update({_id:questionId}, {$push:{tags:tagId}})
    .then((question) =>{
        res.status(201).send(question);
    })
    .catch((err) =>{
        res.status(400).send(err);
    })
});

export default questionRouter;
