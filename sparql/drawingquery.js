var drawingquery = {};
drawingquery.getDrawings =
"select ?starttime ?drawing "+"\n"+
"where {"+"\n"+
"?some <http://purl.org/clls/lecture#drawing> ?variable ."+"\n"+
"?variable <http://purl.org/clls/drawing#commands> ?drawing ."+"\n"+
"?variable <http://purl.org/clls/drawing#starttime> ?starttime }";

console.log(drawingquery.getDrawings);

module.exports.drawingquery = drawingquery;


