/*Query to fetch the data for Loading the Video Lecture Web page*/



//var global.gIRI;
//var getIRI = function (iri){
//	IRI = iri;
//	return iri;
//	console.log(IRI);
//}
//var IRI = "http://clls.rbg.informatik.tu-darmstadt.de/clls/store/lecture/" + global.gIRI;
var videoquery = {};
videoquery.getVideos =
"select ?lecture ?thumbnails ?begin ?end ?title"+"\n"+ 
"where {"+"\n"+ 
	"?some <http://purl.org/clls/lecture#video> ?videoid . "+"\n"+
	"?videoid <http://purl.org/media#download> ?lecture ."+"\n"+ 
	"?some <http://purl.org/clls/lecture#timeSegment> ?timeid ."+"\n"+
       "?timeid <http://purl.org/clls/timesegment#slide> ?timeid2 ."+"\n"+
       "?timeid2 <http://purl.org/clls/slide#image> ?image ."+"\n"+
       "?image <http://xmlns.com/foaf/0.1/thumbnail> ?thumbnails ."+"\n"+
       "?videoid <http://purl.org/media#download> ?lecture ."+"\n"+//"}";
	"?timeid <http://purl.org/clls/timesegment#begin> ?begin ."+"\n"+
	"?timeid <http://purl.org/clls/timesegment#end> ?end . "+"\n"+
	"?timeid2 <http://purl.org/dc/terms/title> ?title ."+"\n"+
	"FILTER regex(str(?lecture),'.mp4') "+"\n"+"}"+"\n"+
	"ORDER BY ASC(?begin)";

//console.log(videoquery.getVideos);



//module.exports.getIRI = getIRI;
module.exports.videoquery = videoquery;
