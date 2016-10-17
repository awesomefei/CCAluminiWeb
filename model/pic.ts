import * as mongoose from 'mongoose';

export interface IPic extends mongoose.Document{
    picName:string,
    date:Date;
    location:number,
    describtion:string,
    tag:mongoose.Schema.Types.ObjectId,
}

let picSchema = new mongoose.Schema({
    picName:{
        type:String,
        required:false
    },
    date:{
        type: Date,
        required: false,
        default:new Date()
    },
    location:{
        type:String,
        required:false
    },
    describtion:{
        type:String,
        required:false
    },
    tag:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tag',
    }],

})

export default mongoose.model<IPic>('Pic', picSchema);
