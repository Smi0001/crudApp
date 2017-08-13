/*
 * server bna rele h
 * After MongoDB connected ho rele h
 */
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db;
var url = 'mongodb://smi:smi1234@ds153392.mlab.com:53392/filmy-dialogues';
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database;
  app.listen(3000, () => {
    console.log('currently listening on 3000');
  });
});

app.set('view engine', 'ejs')
.use(bodyParser.urlencoded({extended: true}))
.use(express.static(__dirname + '/static'))
.get('/', (req, res) => {   
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log('--->Error->',err);
    //res.sendFile(__dirname + '/index.html');
    res.render('index.ejs', {quotes: result});
  });
})
.post('/saveQuotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log('--->Error->',err);
    console.log('--->saved to database');
    res.redirect('/');
  });
})
.post('/deleteQuote', (req, res) => {
  db.collection('quotes').remove({_id: new ObjectId(req.body._id)}, function(err, result) {
    if (err) console.log('--->Error->',err);
    console.log('--->deleted->', req.body._id);
    res.send(req.body);                      
  });
})
.post('/updateQuote', (req, res) => {
  var _body = req.body;
  console.log('_body', _body);
  var ObjectId = require('mongodb').ObjectId;
  var myquery = {"_id": new ObjectId(_body._id)};
  var newvalues = { name: _body.name, quote: _body.quote };
  db.collection('quotes').updateOne(
    myquery,//query
    newvalues, // replacement
    (err, result) => {
    if (err) console.log('--->Error->',err);
    res.send(result);
  });
});

console.log('The server started well TAAU :p');
