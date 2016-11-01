/**
 * Created by sonja on 30/10/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

function notFound(req,res, next) {
    res.setHeader("Content-Type", 'text/html');
    res.status(404).send("We could not find your page!");
}

function errorHandler(err, req, res, next) {
    res.status(500).end(err.message);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/routes.js'));
app.use(express.static(__dirname + '/public'));

app.use(notFound);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, function () {
    console.log('Example app listening on port 3000!');

});