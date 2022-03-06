const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');


const entityRoutes = require('./routes/entityRoutes');

const http = require('http');

const app = express();

// Logger
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Routes
 */
app.use(express.json());
app.use(entityRoutes);

app.use("/apidoc", express.static(__dirname + '/public/apidoc'));

const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);
const server = http.createServer(app);
// server.listen(port);
server.listen(port, () => {
    console.log(`La app está funcionando en http://${process.env.APP_URL}:${port}`);
});

module.exports = app;
