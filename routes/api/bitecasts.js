const admin = require('firebase-admin');
const serviceAccount = require('../../gcpconfig.json');

module.exports = (app) => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      
      const db = admin.firestore();
      const bitecastsRef = db.collection('bitecasts');
      
      
      app.param('id', (req, res, next, id) => {
      
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
      
        app.get('/bitecasts', (req, res, next) => {
      
          const query = bitecastsRef.orderBy(field, "desc").limit(pageSize);
          const results = [];
          query.get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
              //console.log(doc.id, '=>', doc.data());
              let data = doc.data();
              data["id"] = doc.id;
              results.push(data);
              });
              return results;
          })
          .then((results) =>{
            console.log(results);
              res.status(200).json({bitecasts: results});
              console.log("Bitecasts GET / ");
          })
          .catch((err) => {
              console.log('Error getting documents', err);
          });
          
      
        });
        
        app.get('/bitecasts/:id', (req, res, next) => {
            console.log(req);
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
};



//module.exports = bitecasts;