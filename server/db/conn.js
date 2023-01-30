const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://smi:<password>@cluster0.d5btie0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
    });
  },
 
  getDb: function () {
    return _db;
  },
};
