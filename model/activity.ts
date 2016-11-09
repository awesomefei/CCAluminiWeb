import * as mongoose from 'mongoose';
import * as User from './user';
import * as Activity from './activity';
import * as Comment from './comments';

var deepPopulate = require('mongoose-deep-populate')(mongoose);

export interface IActivity extends mongoose.Document {
    userId: string,
    message: string,
    timeCreate: Date,
    likeCount: number,
    comments: Comment.IComment[]
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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

activitySchema.plugin(deepPopulate, )

export default mongoose.model<IActivity>('Activity', activitySchema);
