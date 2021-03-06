/*NodeJS file to fetch data from Triplestore for the Loading of Lectures Web page
Functionality:
*Loads the query
*Runs the query on Triplestore DB
*Formats the results, before returning them to the Frontend 
*/
// file which fetches json data for the video page.

exports.list = function(req, res) {
   var sparql = require('../sparql/drawingquery');

   var config = require('config');
   var storeConfig = config.get('Store');
   var sparqlendpoint = storeConfig.protocol + storeConfig.Credentials.user + ':' + storeConfig.Credentials.password + "@" + storeConfig.url + ":" + storeConfig.port + "/repositories/" + storeConfig.repository;

   var sparqlquery = sparql.drawingquery.getDrawings;

   var SparqlClient = require('sparql-client');
   var sparqlclient = new SparqlClient(sparqlendpoint);
   var IRI = "<http://clls.rbg.informatik.tu-darmstadt.de/clls/store/lecture/" + global.gIRI + ">";
   
   //sparqlclient.query(sparqlquery).bind('some',IRI);
   //console.log(IRI);
   sparqlclient.query(sparqlquery).bind('some',IRI).execute(function(error, result) { 
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
            lectureobj.starttime = binding.starttime.value;
	    lectureobj.drawing = binding.drawing.value;
            response.push(lectureobj);
         }
         res.json(response);
      }
   });
}
