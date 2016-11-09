import * as mongoose from 'mongoose';
import * as Answer from './answer';
import * as User from './user';
import * as Tag from './tag';


export interface IQuestion extends mongoose.Document{
    title:string,
    text:string,
    timeCreate:Date,
    voteCount:number,
    answerCount:number,

    users:User.IUser[],
    answers:Answer.IAnswer[],
    tags:Tag.ITag[],

}

let questionSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    timeCreate:{
        type:Date,
        required:true
    },
    voteCount:{
        type:Number,
        required:false,
        default:0,
    },
    answerCount:{
        type:Number,
        required:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    answers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Answer'
    }],
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tag'
    }],
});
export default mongoose.model<IQuestion>('Question',questionSchema);
