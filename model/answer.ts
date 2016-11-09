import * as mongoose from 'mongoose';
import * as User from './user';

export interface IAnswer extends mongoose.Document{
    user:User.IUser,
    text:String,
    timeCreate:Date,
}

let answerSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        red:'User'
    },
    text:{
        type:String,
        required:true
    },
    timeCreate:{
        type:Date,
        required:true
    }
});
export default mongoose.model<IAnswer>('Answer',answerSchema );
