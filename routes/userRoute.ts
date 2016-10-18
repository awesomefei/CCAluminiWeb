import * as express from 'express';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as jwt from 'jsonwebtoken';
import User from '../model/user';

let userRouter = express.Router();

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
        console.log(req);
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.birthdateMonth = req.body.birthdateMonth;
        newUser.birthdateDay = req.body.birthdateDay;
        newUser.birthdateYear = req.body.birthdateYear;
        newUser.username = req.body.username;
        newUser.setPassword(req.body.password);
        console.log(newUser.password);

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
            }

            res.send(data);
        }
    }

}

userRouter.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), login);

function login(req,res){
    if(req.isAuthenticated()){
        let data ={
            token: req.user.generateToken(),
            admin: req.user.admin,
            username: req.user.username,
        }
        console.log(data)
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
            console.log(decoded);
            next();
        }
    })
}

export default userRouter;