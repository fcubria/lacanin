'use strict';

require('dotenv').config();

//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Sentence = require("./model/sentences")

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

// db config
mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_URL);


//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    console.log(process.env.DB_URL)
    res.json({ message: 'API Initialized!'});
});


router.route('/sentences')
    //retrieve all sentences from the database
    .get(function(req, res) {
        Sentence.find(function(err, sentences) {
            if (err)
            res.send(err);
            //responds with a json object of our database sentences.
            res.json(sentences);
        });
    })
    //post new sentence to the database
    .post(function(req, res) {
        var sentence = new Sentence();
        //body parser lets us use the req.body
        sentence.text = req.body.text;
        sentence.date = req.body.date;
        sentence.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Sentence successfully added!' });
        });
    });

//Adding a route to a specific sentence based on the database ID
router.route('/sentences/:sentence_id')
    //The put method gives us the chance to update our sentence based on 
    //the ID passed to the route
    .put((req, res) => {
        Sentence.findById(req.params.sentence_id, (err, sentence) => {
            if(err) res.send(err);
            //Setting the new author and text to whatever was changed. If 
            //nothing was changed we will not alter  the field. 
            (req.body.text) ? sentence.text = req.body.text : null;
            (req.body.date) ? sentence.date = req.body.date : null;
            //save sentence
            sentence.save((err) => {
                if(err) res.send(err);
                res.json({message: 'sentence has been updated.'});
            });
        });
    });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});

