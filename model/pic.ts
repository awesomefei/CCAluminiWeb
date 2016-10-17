import * as mongoose from 'mongoose';

export interface IPic extends mongoose.Document{
    picName:string,
    date:Date;
    location:number,
    describtion:string,
    tag:mongoose.Schema.Types.ObjectId,

}
