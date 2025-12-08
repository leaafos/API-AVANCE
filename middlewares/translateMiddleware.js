//dès qu'il voit une clé qui finit par "_trad", il traduit la valeur associée
const initTranslation = require('../lib/i18next.js');
const TaskModel = require('../models/task.js');

module.exports = function translateMiddleware (req, res, next) {
  console.log("Translate middleware");
  res.trad = initTranslation(req) 
  res.setHeader('Content-Language', req.language);
  next();
};

