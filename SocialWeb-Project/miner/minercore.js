//initialization
var fs = require('fs');
var Writable = require('stream').Writable;
var TwitterStream = require('../node_modules/twitter-stream-api');
var keysString = fs.readFileSync('./miner/keys.json');
var keys = JSON.parse(keysString);
var Twitter = new TwitterStream(keys);


var Miner = {

    startstream: function (term, callback) {
 
        Twitter.stream('statuses/filter', {
            track: [term],
        });
        
        Twitter.on('data', function (obj) {
            callback(obj);
        });
        
    },
    
    stopstream: function () {
        if (Twitter.connection.request != null)
            Twitter.close();
    }, 
    
};



//stream ouputs

Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
});

Twitter.on('connection aborted', function () {
    console.log('connection aborted');
});

Twitter.on('connection error network', function () {
    console.log('connection error network');
});

Twitter.on('connection error stall', function () {
    console.log('connection error stall');
});

Twitter.on('connection error http', function (err) {
    console.log('connection error http', err);
});

Twitter.on('connection rate limit', function () {
    console.log('connection rate limit');
});

Twitter.on('connection error unknown', function () {
    console.log('connection error unknown');
});

Twitter.on('data keep-alive', function () {
    console.log('data keep-alive');
});

Twitter.on('data error', function () {
    console.log('data error');
});


module.exports = Miner;