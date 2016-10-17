import * as mongoose from 'mongoose';
// import * as crypto from 'crypto-js';
import * as jwt from 'jsonwebtoken';

export interface IUser extends mongoose.Document{
    firstname:string,
    surname:string,
    email:string,
    password:string,
    profileImageUrl:string,
    workingExperience:string,
    hobby:string,
    currentCity:string,
    onlineStatus:string,
    detailsAboutUser:string,
    employment:string,
    education:string,
    admin:boolean,

    pics: Pic.IPic,
    friendsList:mongoose.Schema.Types.ObjectId,
    activities:mongoose.Schema.Types.ObjectId,

    validatePassword(password),
    setPassword(password),
    generateToken()

}

let userSchema = new mongoose.Schema({
    pics:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pic"
    },
    //only user Id
    firendsList:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    activities:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Activity'
    },


    hobby:{
        type:String,
        required:false,
    },
    currentCity:{
        type:String,
        required:false,
    },
    onlineStatus:{
        type:String,
        enum:['online', 'offline'],
    },
    detailsAboutUser:{
        type:String,
        required:false,
    },
    employment:{
        type:String,
        required:false
    },
    education:{
        type:String,
        required:false
    },

    profileImageUrl:{
        type:String,
        required:false,
    },
    workingExperience:{
        type:String,
        required:false,
    },


    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    surname:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        match:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },

    password:{
        type:String,
        required:true,

    },
    admin:{
        type:Boolean,
        default:false,
        required:false,
    }

})
export default mongoose.model<IUser>('User', userSchema);
