import * as express from 'express';
import * as mongodb from 'mongodb';
import Question from '../../model/question';
import Tag from '../../model/tag';

let tagRouter = express.Router();
let ObjectId = mongodb.ObjectID;

tagRouter.get('/', (req, res) =>{
    Tag.find()
    .populate('questions')
    .then((tags) =>{
        res.send(tags);
    })
    .catch((err) =>{
        res.send(err)
    });
});
tagRouter.get('/:id', (req,res) =>{
    console.log('!!!!!!!!!');
    // var id = new ObjectId(req.params.id)
    Tag.findById(req.params['id'])
    //.populate('questions')
    .populate({
        path:'questions',
        model:'Question',
        populate:{
            path:'tags',
            model:'Tag',
        }
    })
    .then((tag) =>{
        console.log(tag)
        res.send(tag);
    })
    .catch((err) =>{
        res.send(err);
    })
})
tagRouter.post('/', (req, res) =>{
    let tag = new Tag();
    tag.item=req.body.item;
    tag.save()
    .then((tag) =>{
        res.send(tag);
    })
    .catch((err) =>{
        res.send(err);
    })
});
    tagRouter.post('/addquestion/:tagId', (req, res) =>{
    let tagId = new ObjectId(req.params['tagId']);
    let questionId = new ObjectId(req.body.questionId);
    console.log(tagId);
    console.log(questionId);
    Tag.update({_id:tagId}, {$push:{questions: questionId}})

    .then((tag) =>{
        console.log(tag);
        res.status(201).send(tag);
    })
    .catch((err) =>{
        res.status(400).send(err);
    })


});
export default tagRouter;
