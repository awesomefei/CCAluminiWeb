import * as mongoose from 'mongoose';
import * as User from './user';
import Message from './message'

export interface IMessage extends mongoose.Document {
    userSend: string,
    userRecieve: string,
    title: string,
    message: string,
    messages: IMessage[];
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
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    timeCreate: {
        type: Date,
        required: true
    }


});

export default mongoose.model<IMessage>('Message', messageSchema);
