import * as express from 'express';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as jwt from 'jsonwebtoken';
import User from '../model/user';
import * as mongodb from 'mongodb';

let userRouter = express.Router();

//READ users
userRouter.get('/', (req,res)=>{
    User.find().then((users)=>{
        res.send(users)
    }).catch(()=>{
        res.status(500);
    })
});
//READ user


//Get user that is logged on
userRouter.get('/user', authorize, (req,res)=>{
    User.findOne({username: req.user.username})
    .populate('friendsList')
    .populate('pics')
    .then((user)=>{
        user.password=" "
        res.send(user);
    }).catch(()=>{
        res.status(500);
        console.log("User not found");
    })
})

//read a user
userRouter.get('/:id', (req,res)=>{
    User.findById(req.params['id'])
    .then((user)=>{
        res.send(user);
    }).catch((err)=>{
        res.status(err)
    })
})

//delete users
userRouter.delete('/:id', (req,res)=>{
    User.findByIdAndRemove(req.params['id']).then((user)=>{
        res.sendStatus(200);
    }).catch(()=>{
        res.sendStatus(400);
    })
})

//LOGIN AND REGISTRATION
let LocalStrategy = passportLocal.Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function (username, password, done){
    User.findOne({username: username.trim()})
    .then(function(user){
        //if no user found, send back error message
        if(!user) {
            console.log('no user found')
             return done(null, false, {message: 'incorrect email'});
        }
        //if password doesn't match, send back error message
        if(!user.validatePassword(password)) {
            console.log('incorrect pw')
            return done(null, false, {message: 'incorrect password'});
        }

        user.password = null;
        return done(null, user)
    })
    .catch((err)=>{
        return done(err);
    })
}))


//get user by id and update
userRouter.put('/image', authorize,(req, res) =>{
    User.findOneAndUpdate({

        username:req.user.username},
        {profileImageUrl:req.body.profileImageUrl},
        function(err,user){
            if (err) {res.sendStatus(404)}
            else{
                res.status(200).send(user);
                // console.log("!!!!!!!!!!!!!userRouter.put " + user);
            }
            // we have the updated user returned to us

    })
})

userRouter.put('/detail', authorize,(req, res) =>{
    User.findOneAndUpdate(
        {username:req.user.username},
        {detailsAboutUser:req.body.detailsAboutUser},
        function(err,user){
            if (err) {
                console.log(err);
                res.sendStatus(404)}
            else{
                res.status(200).send(user);
                // console.log("!!!!!!!!!!!!!userRouter.put " + user);
            }
            // we have the updated user returned to us

    })
})
userRouter.put('/work', authorize,(req, res) =>{
    console.log("!!!!!!!!!!!!!workingExperience.put " + req.body.workingExperience);
    User.findOneAndUpdate(
        {username:req.user.username},
        {workingExperience:req.body.workingExperience})
        .then((user) =>{
            res.status(200).send(user);
        })
        .catch((err) =>{
            console.log(err);
            res.send(err)
        })
})


userRouter.put('/education', authorize,(req, res) =>{
    console.log("!!!!!!!!!!!!!userrouter.  " + req.body.education);
    User.findOneAndUpdate(
        {username:req.user.username},
        {education:req.body.education},
        function(err,user){
            if (err) {
                console.log(err);
                res.sendStatus(404)}
            else{
                res.status(200).send(user);
            }

    })
})


//Read one user
userRouter.get('/account', authorize, (req, res) =>{
    User.findById(req.user.id)
    .then((data) =>{
        data.password = '';
        res.send(data);
    })
    .catch(() =>{
        res.send(400);
    })
})
//READ users
userRouter.get('/', (req,res)=>{
    User.find().then((users)=>{
        res.send(users)
    }).catch(()=>{
        res.status(500);
    })
})

//delete users
userRouter.delete('/:id', (req,res)=>{
    User.findByIdAndRemove(req.params['id']).then((user)=>{
        res.sendStatus(200);
    }).catch(()=>{
        res.sendStatus(400);
    })
})




userRouter.post('/register', register,  passport.authenticate('local', {failureRedirect: '/login'}), login);

 function register(req,res,next){

    req.checkBody('firstname', 'Firstname is required').notEmpty();
    req.checkBody('lastname', 'Lastname is required').notEmpty();
    req.checkBody('username', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is requried').notEmpty();
    //made form the client side
    req.checkBody('confirmPassword', 'Password do not match').equals(req.body.password);

    let errors = req.validationErrors();
    if(errors){
        res.status(400).send(errors);
    } else {
        let newUser = new User();
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.birthdateMonth = req.body.birthdateMonth;
        newUser.birthdateDay = req.body.birthdateDay;
        newUser.birthdateYear = req.body.birthdateYear;
        newUser.username = req.body.username;
        newUser.setPassword(req.body.password);


        newUser.save()
        .then((user)=>{
            console.log('User has been saved')

            next();
            // res.send(user);
        //sends back password all hashed up so never do this.
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function login(req,res){
        if(req.isAuthenticated()){
            let data ={
                token: req.user.generateToken(),
                admin: req.user.admin,
                username: req.user.username,
                firstname: req.user.firstname
            }

            res.send(data);
            console.log(data.token)
        } else {
            res.send('registration failed')
        }
    }

}

userRouter.post('/login', passport.authenticate('local'), login);



function login(req,res){
    if(req.isAuthenticated()){
        let data ={

            token: req.user.generateToken(),
            admin: req.user.admin,
            username: req.user.username,
            firstname: req.user.firstname
        }
        res.send(data);

    } else {
        res.send('you are not authenticated')
    }

}

function authorize(req, res, next){
    let token = req['token'];
    jwt.verify(token, 'SuperSecret', function(err,decoded){
        if(err){
            res.sendStatus(401)
        } else {
            req.user = decoded;
            next();
        }
    })
}
// userRouter.post('/addPic', (req, res) =>{
//     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
//     User.
//
// })

export default userRouter;
