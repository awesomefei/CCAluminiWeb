import * as mongoose from 'mongoose';
import User from './user';
import * as Message from './message'

export interface IActivity extends mongoose.Document {
    userId: string,
    message: string,
    timeCreate: Date,
    likes: number,
    messages: Message.IMessage[];
}

let activitySchema = new mongoose.Schema ({
    userId: {
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
    },
    likes: {
        type: Number,
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

export default mongoose.model<IActivity>('Activity', activitySchema);
