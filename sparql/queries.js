/*Query to fetch the data for List of Lectures Web page*/
var query = {};
query.getLectures = 
 "select ?lecture ?title ?moduletitle ?semestertitle ?date"+"\n"+
"where {"+"\n"+
  "?lecture a <http://purl.org/clls/lecture#Lecture> ."+"\n"+
  "?lecture <http://purl.org/clls/lecture#video> ?videoid . "+"\n"+
  "?videoid <http://purl.org/media#download> ?lecture2 . "+"\n"+ 
  "?lecture <http://purl.org/dc/terms/title> ?title ."+"\n"+
  "?lecture <http://purl.org/clls/lecture#module> ?module ."+"\n"+
  "?module <http://purl.org/dc/terms/title> ?moduletitle ."+"\n"+
  "?lecture <http://purl.org/clls/lecture#semster> ?semester ."+"\n"+
  "?semester <http://purl.org/dc/terms/title> ?semestertitle . "+"\n"+
  "?lecture <http://purl.org/clls/lecture#date> ?date ."+"\n"+"}";

module.exports.query = query;
