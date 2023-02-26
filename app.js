const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fetch = require('fetch');
//TWITTER SHIT
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
const qs = require('querystring');
const got = require('got');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
require('dotenv').config();


//Twitter API 
const {TwitterApi} = require('twitter-api-v2');

//Twitter API Keys
const client = new TwitterApi({
INSERTKEYS
});

const app = express();
const PORT = 3000

app.use(logger('dev'));
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const defaultSft = "https://media.gettyimages.com/photos/disabled-woman-training-taekwondo-with-her-coach-picture-id1350650910?s=2048x2048"
let currentSft = defaultSft


//Set funge counter
var fungecounter = 0

/* defining 3 routes


/* GET home page. */
const router = express.Router();
/*redirect blank / to /home instead*/
router.get('/', (req, res) => { res.redirect('/home') })
/*when you get /home look for /index index will build this shit*/
router.get('/home', (req, res) => {
  /*look for index */
  res.render('index', { sfturl: currentSft, fungecounter: fungecounter });
});
//redirect sft.jpg to currentSFT
router.get('/sft.jpg', (req, res) => { res.redirect(currentSft) });



/* Sft */
/*you can post to /sft but not to other places*/
router.post('/sft', (req, res, next) => {
/*if request has a body (eg. content) then post it */
  console.log(req.body)
/*if request has a body (eg. content) then post it */
  if (req.body) {

    currentSft = req.body.sfturl;
    fungecounter = ++fungecounter;

    
    //post tweet with new URL
    client.v2.tweet('The Super Fungible Token (sft.jpg) has been funged again! It now points to this image: ' + currentSft + '. This is funge #' + fungecounter + '. Funge the token yourself at superfungibletoken.com. Link to the SFT in bio.').then((val) => {
        console.log(val)
        console.log("success")
    }).catch((err) => {
        console.log(err)
    })

  }
});


app.use('/', router);
module.exports = app;


