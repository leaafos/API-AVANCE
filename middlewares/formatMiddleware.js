const Papa = require('papaparse');
const xml2js = require('xml2js');

function toLowerCaseObjectKeys(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
}

module.exports = function formatMiddleware (req, res, next) {
  console.log("Format middleware");
  res.render = function (data) {
    res.format({
        'text/csv' (){
            const csv = Papa.unparse({data: data.map ((dataOrm) => toLowerCaseObjectKeys (dataOrm.dataValues))});
            res.setHeader('Content-Type', 'text/csv');
            res.send(csv);
        },
        default (){
            res.json(data);
        },
        'text/xml' (){
          const name = (Array.isArray(data) ? data[0] : data).constructor.name.toLowerCase();
          const builder = new xml2js.Builder();
          const xml = builder.buildObject(Array.isArray(data) ? {[name + "s"]:data.map ((dataOrm) => ({[name] : toLowerCaseObjectKeys (dataOrm.dataValues)}))} : {[name]: toLowerCaseObjectKeys (data.dataValues)});
          res.setHeader('Content-Type', 'text/xml');
          res.send(xml);
        }
    });
  };
  next();
}
