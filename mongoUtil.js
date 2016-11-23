/**
 * Created by razon on 11/20/16.
 */
var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

module.exports = {

    connectToServer: function( callback ) {
        MongoClient.connect( "mongodb://rasifmahmud16:123456asd@ds161485.mlab.com:61485/razon-mongo", function( err, db ) {
            _db = db;
            return callback( err );
        } );
    },

    getDb: function() {
        // var col = _db.collection('messages');
        return _db;
    }
};