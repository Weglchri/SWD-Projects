var miner = require("../miner/minercore");
var minerview = require('./../views/minerview');
var dataMap = new Map;

const minermodel = {
        
    searchTerm: function (term) {
        miner.startstream(term, function (obj) {
            location = processLocation(obj);
            if(location){
                fillGraphData(location);
                console.log(location);
            }else{
                console.log("---undefined or no country noted---");
            }
        });
    },
    
    stopSearch: function () {
        miner.stopstream();
    },
    
    //send as object for handlebars
    getGraphData: function () {
        return {dataMap};
    },
    
    setLocationMap: function() {
        dataMap = new Map;
    },

};

//returns location if exists (just country)
function processLocation (obj) {
    if (obj && obj.user && obj.user.location != null && obj.user.location.split(",")[1]){
         return obj.user.location.split(",")[1];
    }else{
         return false;
    }          
}

//fill map data for graph
function fillGraphData (location) {
    typeof dataMap[location] === 'undefined' ? dataMap[location] = 1 : dataMap[location]++;    
    return true;
}


module.exports = minermodel;