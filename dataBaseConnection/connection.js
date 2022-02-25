
var MongoClient = require('mongodb').MongoClient;

function connectionDatabase() {
    return new Promise((resolve, reject) => {
        // var url = 'mongodb://localhost/flighteno';
        // var url = 'mongodb://127.0.0.1/flighteno';
        // var url = 'mongodb+srv://aism:95bcqr1Tech@flightenocluster.irdgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        var url = 'mongodb+srv://flight-db-user:XtLGA9vSgRUkBmWI@flightenocluster.irdgi.mongodb.net/flighteno?retryWrites=true&w=majority';

        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async(err, client) => {
            if (err) {
                // db.close();
                reject(err);
            } else {
                console.log('connected!!!!');
                const db = client.db('flighteno');
                resolve(db);
            }//End of  connection success
        });//End of Db Connection
    });//End of promise object
}//End of connectionDatabase

module.exports = connectionDatabase();
