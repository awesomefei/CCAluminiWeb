import * as mongoose from 'mongoose';
import * as User from './user';

export interface IAnswer extends mongoose.Document{
    user:User.IUser,
    text:String,
    timeCreate:Date,
    usefulCount:number,
}

let answerSchema=new mongoose.Schema({
    usefulCount:{
        type:Number,
        required:false,
        default:0,
    },
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
