import * as express from 'express';
import * as mongodb from 'mongodb';
import User from '../model/user';

let ObjectId = mongodb.ObjectID;
let userAccountRoute = express.Router();
