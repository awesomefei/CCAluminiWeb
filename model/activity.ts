import * as mongoose from 'mongoose';
import * as User from './user';
import Activity from './activity';

export interface IActivity extends mongoose.Document {
    userId: string,
    message: string,
    timeCreate: Date,
    likeCount: number,
    activities: IActivity[];
    likes: User.IUser[];
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
    likeCount: {
        type: Number,
        required: true
    },
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default mongoose.model<IActivity>('Activity', activitySchema);
