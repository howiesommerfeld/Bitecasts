const express = require('express');
const bitecasts = express.Router()
const admin = require('firebase-admin');

let serviceAccount = require('../gcpconfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const bitecastsRef = db.collection('bitecasts');


bitecasts.param('id', (req, res, next, id) => {

    let getDoc = bitecastsRef.doc(id).get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            res.sendStatus(404);
        } else {
            console.log('Document data:', doc.data());
            req.bitecast = doc.data();
            next();
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
        next(error);
    });
  });

  bitecasts.get('/', (req, res, next) => {

    const query = bitecastsRef.orderBy(field, "desc").limit(pageSize);
    
    query.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
    
    console.log("Bitecasts GET / ")

  });
  
  bitecasts.get('/:id', (req, res, next) => {
    res.status(200).json({bitecast: req.bitecast});
  });

const field = 'created';
const pageSize = 10;

function nextPage(last) {
    return bitecastsRef.orderBy(field, "desc")
        .startAfter(last[field])
        .limit(pageSize);
}

function prevPage(first) {
    return bitecastsRef.orderBy(field, "desc")
        .endBefore(first[field])
        .limitToLast(pageSize);
}

module.exports = bitecasts;