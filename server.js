const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 5000;

const router = express.Router()

app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(router);

app.listen(port, () => {
    console.log('listening on *:' + port);
  });