/*
 * server bna rele h
 * After MongoDB connected ho rele h
 */
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
var db;
MongoClient.connect('mongodb://smi:smi1234@ds153392.mlab.com:53392/filmy-dialogues', (err, database) => {
  if (err) return console.log(err)
  db = database;
  app.listen(3000, () => {
    console.log('currently listening on 3000');
  });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
.use(express.static(__dirname + '/static'))
.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    // renders index.ejs
    //console.log('res'+result);
    //res.sendFile(__dirname + '/index.html');
    res.render('index.ejs', {quotes: result});
  });
})
.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
})
.delete('/del', function (req, res) {
  res.send('DELETE request to homepage');
  // res.redirect('/');
});
console.log('The server started well TAAU :p');