/*NodeJS is the backend server, listening to the browser requests
*Functionality:
*Depending on the request, provides data to web page or posts data to Database
*/


//process.env.NODE_ENV = "production";          // [development, production]
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var bodyParser = require('body-parser');
var express = require('express');
//var authapp = require('./app');
var app = express();



//function start(){
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
   extended: true 
}));
app.use('/', express.static(__dirname + '/public')); 


var getLectures = require('./routes/getLectures')
var getVideos = require('./routes/getVideos')
var getAdmin = require('./routes/getAdmin')
var getModules = require('./routes/getModules')
var getSemesters = require('./routes/getSemesters')
var getDrawings = require('./routes/getDrawings')

//app.get('/lectures', getLectures.list);







//Specifies the return HTML file/JSON data to be returned when "/lectures" is called
app.get('/lectures', function(req, res) {     
	res.format({
         json: getLectures.list,
         html: function() {
            var fileName = 'lectures.html';
            res.sendFile(fileName, {root: __dirname + '/public/'}, function(err) {
                  if (err) {
                     console.log(err);
                     res.status(err.status).end();
                  }
               });
            }
      });
   });

//Listens to a Post request on the "/lectures" page, right now we are not using this functionality
app.post('/lectures',function(req,res){ 
	console.log('Got a post ');
	var data = req.body;
	console.log(data[0].url);
	global.gIRI = data[0].url;
	//IRI.getIRI(data[0].url);
	console.log(global.gIRI);
});

app.get('/lectures/admin/:lectureid', function(req, res) {
      global.gadIRI = req.param("lectureid");
      console.log(global.gadIRI);
      //IRI = "<http://clls.rbg.informatik.tu-darmstadt.de/clls/store/lecture/" + global.gadIRI + ">";
      //console.log(IRI);
      res.format({
         json: getAdmin.list,
         html: function() {
            var fileName = 'admin.html';
            res.sendFile(fileName, {root: __dirname + '/public/'}, function(err) {
                  if (err) {
                     console.log(err);
                     res.status(err.status).end();
                  }
               });
            }
      });
   });

//Depending on the "lectureid", NodeJS queries the Triplestore for data relevant to loading a lecture
app.get('/lectures/:lectureid', function(req, res){ //modified here/lectures/iptk -> /lectures/:lectureid
	global.gIRI = req.param("lectureid");	
	//var IRI = require('./sparql/videoqueries');
	res.format({
		json: getVideos.list,
		html: function() {
			var fileName = 'IPTK3.html';
			res.sendFile(fileName, {root: __dirname + '/public/'}, function(err){
				if(err){
					console.log(err);
					res.status(err.status).end();
				}
               });
            }
      });
   });

app.get('/drawings/:lectureid', function(req, res){ //modified here/lectures/iptk -> /lectures/:lectureid
	global.gIRI = req.param("lectureid");	
	//var IRI = require('./sparql/videoqueries');
	res.format({
		json: getDrawings.list
      });
   });

app.get('/modules', function(req, res) {
      res.format({
         json: getModules.list
      });
   });

app.get('/semesters', function(req, res) {
      res.format({
         json: getSemesters.list
      });
   });




//The server listens at port 3000
var server = app.listen(3000, function() {
   var host = server.address().address;
   var port = server.address().port;
   console.log('Example app listening at http://%s:%s', host, port);
});


//}

//exports.start = start;
