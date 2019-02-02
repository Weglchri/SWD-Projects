const port = 3000;

const express = require('express');
const app = express();

require('./router')(app);

app.listen(port);

console.log('Miner running at http://localhost: ' + port + ' /');