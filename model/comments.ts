import * as mongoose from 'mongoose';
import * as User from './user';

export interface IComment extends mongoose.Document {
    userSend: string,
    message: string,
    timeCreate: Date
}

let commentSchema = new mongoose.Schema ({
    userSend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userRecieve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    timeCreate: {
        type: Date,
        required: true
    }
});

export default mongoose.model<IComment>("Comment", commentSchema);
