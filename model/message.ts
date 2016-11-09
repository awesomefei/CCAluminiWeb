import * as mongoose from 'mongoose';
import * as User from './user';
import * as Comment from './comments';

export interface IMessage extends mongoose.Document {
    userSend: string,
    userRecieve: string,
    title: string,
    message: string,
    comments: Comment.IComment[];
    timeCreate: Date
}

let messageSchema = new mongoose.Schema ({
    userSend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userRecieve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    timeCreate: {
        type: Date,
        required: true
    }


});

export default mongoose.model<IMessage>('Message', messageSchema);
