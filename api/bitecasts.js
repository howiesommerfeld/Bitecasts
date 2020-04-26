const express = require('express');
const bitecasts = express.Router()

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
    
    /* db.all('SELECT * FROM Artist WHERE Artist.is_currently_employed = 1',
      (err, artists) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({artists: artists});
        }
      }); */

  });
  
  bitecasts.get('/:id', (req, res, next) => {
    res.status(200).json({bitecast: req.bitecast});
  });



module.exports = bitecasts;