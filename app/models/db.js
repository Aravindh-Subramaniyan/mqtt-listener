const mongoose = require('mongoose');
const Config = require('../../config/config');

async function dbInit(){
    try{
        let db = mongoose.connection;
        mongoose.connect(`mongodb://${Config.database.host}/${Config.database.db}`);
        db.on('open', async function(){
            console.log('Database is connected...');
        });
        
        db.on('error', function(err){
            console.log(err);
            console.log('Database connection error ...');
        });
    } catch(err){
        console.log(err);
    }
}

exports.dbInit = dbInit;