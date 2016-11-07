import * as mongoose from 'mongoose';
import * as Question from './question';

export interface ITag extends mongoose.Document{
    item:string,
    questions:Question.IQuestion[],
}

let tagSchema = new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }],
})
export default mongoose.model<ITag>('Tag', tagSchema);
