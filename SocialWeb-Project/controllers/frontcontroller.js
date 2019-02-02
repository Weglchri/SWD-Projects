const minermodel = require('./../models/minermodel');
const minerview = require('./../views/minerview');
var request = require('request');
const TIMEOUT = {timeout: 1000 * 10};

function handleFrontPage (req, res) {
    res.send(minerview.getFrontPage(minermodel.setLocationMap()));
}

function handleMinerPage(req, res) {
    minermodel.searchTerm(req.query.term);
    res.send(minerview.getMinerPage(TIMEOUT));
}


function handleStopPage (req, res) {
    minermodel.stopSearch();
    res.send(minerview.getStopPage(minermodel.getGraphData()));
}


module.exports = {
    getFrontPage: handleFrontPage,
    getMinerPage: handleMinerPage,
    getStopPage: handleStopPage,
};