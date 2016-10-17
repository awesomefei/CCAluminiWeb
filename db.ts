import * as mongoose from 'mongoose';

const URL ='mongodb://admin:Secret123!@ds019876.mlab.com:19876/codercampsalumini';

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
    }
}

export default Database;
