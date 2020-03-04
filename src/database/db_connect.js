const mysql = require('mysql');
const con = require('./db_config.js');


con.connect(function (err, query) {
    if(err)
        throw err;

   let process = con.query(query,function (err,result) {
        if(err)
            throw err;

        return result;
    });

    con.end();
});

con.query();

module.exports = process;
