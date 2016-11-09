import * as mongoose from 'mongoose';
import * as User from './user';

export interface INotification extends mongoose.Document {
    userSend: string,
    timeCreate: Date
    type: string,
}

let notificationSchema = new mongoose.Schema ({
    userSend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timeCreate: {
        type: Date,
        required: true
    }
});

export default mongoose.model<INotification>('Notification', notificationSchema);
