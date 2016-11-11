import * as express from 'express';
import * as mongodb from 'mongodb';
import Answer from '../../model/answer';
import Question from '../../model/question';
import User from '../../model/user';

let questionRouter = express.Router();
let ObjectId = mongodb.ObjectID;

questionRouter.get('/', (req, res) =>{
    Question.find()
    .populate(' users tags')
    .then((questions)=>{
        res.send(questions);
    }).catch(()=>{
        res.sendStatus(500);
    })
});

questionRouter.get('/:id', (req,res)=>{

    Question.findById(req.params['id'])
    // .populate('answers users tags')
    .populate({
        path:'answers',
        model:'Answer',
    })
    .populate({
        path:'users',
        model:'User',
    })
    .populate({
        path:'tags',
        model:'Tag',
    })

    .then((question)=>{
        res.send(question);
    }).catch((err) =>{
        res.send(err);
    })
});
questionRouter.put('/', (req, res) =>{
    Question.findByIdAndUpdate(req.body._id, req.body)
    .populate('users tags')
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
questionRouter.post('/addAnswer/:questionId', (req, res)=>{
    let questionId= new ObjectId(req.params['questionId']);
    let answer = new Answer();
    answer.text = req.body.text;
    answer.timeCreate = new Date();
    answer.save()
    .then((answer) =>{
        let answerId = new ObjectId(answer._id);
        Question.update({_id:questionId}, {$push:{answers:answerId}})
        .then(() =>{
                res.sendStatus(201);
            })
            .catch(() =>{
                res.sendStatus(404);
            });
        })
        .catch(() =>{
            res.sendStatus(400);
        });
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
