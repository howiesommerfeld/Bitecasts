const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 5000;

const apiRouter = require('./api/api');

app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', apiRouter);

if(process.env.NODE_ENV === 'production') {  
    app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));})
} else {
    app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})
}

/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    });
    app.options("*", cors());
    */

app.listen(port, () => {
    console.log('listening on *:' + port);
  });