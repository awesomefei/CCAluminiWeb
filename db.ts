import * as mongoose from 'mongoose';
import User from './model/user';

const URL ='mongodb://admin:Secret123!@ds019876.mlab.com:19876/codercampsalumini';
// const URL ='mongodb://admin:Secret123!@ds035776.mlab.com:35776/coolkidsdata';


class Database{
    public static connect(){
        mongoose.connect(URL);


        let db = mongoose.connection;

        db.on('err', function(){
            console.log('connection err');
        });
        db.once('open', function(){
            console.log('connected to database!!!');
        })

        User
        .findOne({email: 'codercamps@gmail.com'})
        .then((user)=>{
            if(!user) {
                let adminUser = new User();
                adminUser.username = 'codercamps@gmail.com'
                adminUser.setPassword('Secret123!');
                adminUser.admin = true;
                adminUser
                    .save()
                    .then(()=>{
                        console.log('Admin successfully created');
                    })
                    .catch(()=>{
                        console.log('Admin creation went wrong')
                    })
            } else {
                console.log('Admin already exists in Database')
            }
        })
        .catch((err)=>{
            console.log(err)
        });
    }
}

export default Database;
