const express = require('express');
const bitecasts = express.Router()
const admin = require('firebase-admin');

let serviceAccount = require('../gcpconfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

bitecasts.param('id', (req, res, next, id) => {
    
    /*db.get(sql, values, (error, artist) => {
      if (error) {
        next(error);
      } else if (artist) {
        req.artist = artist;
        next();
      } else {
        res.sendStatus(404);
      }
    });*/

  });

  bitecasts.get('/', (req, res, next) => {
    

  });
  
  bitecasts.get('/:id', (req, res, next) => {
    res.status(200).json({bitecast: req.bitecast});
  });



module.exports = bitecasts;