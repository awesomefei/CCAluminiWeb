import * as mongoose from 'mongoose';
import * as User from './user';

export interface IMessage extends mongoose.Document {
    userSend: string,
    userRecieve: string,
    title: string,
    message: string,
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
        required: true,
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

export default mongoose.model<IMessage>('Message', messageSchema);
