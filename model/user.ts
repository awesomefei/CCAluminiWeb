import * as mongoose from 'mongoose';
// import * as crypto from 'crypto-js';
import * as jwt from 'jsonwebtoken';
import * as Pic from './pic';
const crypto: any = require('crypto-js');

export interface IUser extends mongoose.Document{
    firstname:string,
    lastname:string,
    username:string,
    birthdateMonth: string,
    birthdateDay: string,
    birthdateYear: string,
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

    //only id
    pics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pic"
    }],
    //only user Id
    firendsList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    activities:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Activity'
    }],


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
        required:false,
        trim:true,
    },
    lastname:{
        type:String,
        required:false,
        trim:true,
    },
    birthdateMonth:{
        type: String,
        required: false,
    },
    birthdateDay:{
        type: String,
        required: false,
    },
    birthdateYear:{
        type: String,
        required: false,
    },

    username:{
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

userSchema.method('setPassword', function(password){
    // this.salt = crypto.randomBytes(16).toString('hex');
    // this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    this.password = crypto.AES.encrypt(password, 'SuperSecret');
});

userSchema.method('validatePassword', function(password){
    // let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    // console.log(hash==this.password);

    let hash = crypto.AES.decrypt(this.password, 'SuperSecret');

    return password === hash.toString(crypto.enc.Utf8);
});

//makes a token, don't put sensitive info in here
userSchema.method('generateToken', function(){
    return jwt.sign({
        id: this._id,
        username: this.username,
        admin: this.admin,
    }, 'SuperSecret');
})

export default mongoose.model<IUser>('User', userSchema);
