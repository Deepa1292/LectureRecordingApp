/*NodeJS file to fetch data from Triplestore for the List of Lectures Web page
Functionality:
*Loads the query
*Runs the query on Triplestore DB
*Formats the results, before returning them to the Frontend 
*/
exports.list = function(req, res) {
   var sparql = require('../sparql/adminquery3');

   var config = require('config');
   var storeConfig = config.get('Store');
   var sparqlendpoint = storeConfig.protocol + storeConfig.Credentials.user + ':' + storeConfig.Credentials.password + "@" + storeConfig.url + ":" + storeConfig.port + "/repositories/" + storeConfig.repository;

   var sparqlquery = sparql.adminquery3.getSemesters;

   var SparqlClient = require('sparql-client');
   var sparqlclient = new SparqlClient(sparqlendpoint);

   sparqlclient.query(sparqlquery).execute(function(error, result) {
      if (result == null) {
         console.log("ERROR: Could not query ratings " + error);
         res.json({
            response: 'error'
         });
      } else if (result) {
         var response = [];
         var bindings = result.results.bindings;
         for (var i = 0; i < bindings.length; i++) {
            var binding = bindings[i];
            var lectureobj = {};
            lectureobj.semester = binding.sem.value;
            response.push(lectureobj);
         }
         res.json(response);
      }
   });
}
