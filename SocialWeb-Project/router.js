const frontcontroller = require('./controllers/frontcontroller.js');

module.exports = function (app) {
    app.get('/', frontcontroller.getFrontPage);
    app.get('/start', frontcontroller.getMinerPage);   
    app.get('/stop', frontcontroller.getStopPage);
};
