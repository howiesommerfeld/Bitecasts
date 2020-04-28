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

app.use('/api', apiRouter);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    });

if(process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));
    let p = path.join(__dirname, 'client/build/index.html');
    console.log(p);
    app.get('*', (req, res) => {    res.sendfile(p);})
} else {
    let p = path.join(__dirname,'client/public/index.html');
    console.log(p);
    app.get('*', (req, res) => {  res.sendFile(p);})
}


app.listen(port, () => {
    console.log('listening on *:' + port);
  });