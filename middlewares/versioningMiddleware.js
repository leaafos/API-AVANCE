//middleware pour afficher les bonnes versions de l'api selon le header X-Api-Version pour les versions des fonctions dans le controlleur
const getAskedVersion = require('../lib/versioning.js');

module.exports = function versioningMiddleware(versions) {
  return function versioningApi (req, res, next) {
  console.log("Versioning middleware");
  req.apiVersion = getAskedVersion(req);
  if (req.apiVersion in versions) {
      req.apiVersionFunctions = versions[req.apiVersion];
  } else {
      req.apiVersionFunctions = versions['default'];
  }
  return req.apiVersionFunctions(req, res, next);
  };
};