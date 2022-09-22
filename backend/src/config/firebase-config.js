
const admin = require("firebase-admin");
// path to service account
const serviceAccount = require("./ServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;