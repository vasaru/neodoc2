//exampleToNeo4j.js
var neo4j = require("node-neo4j");
var db = new neo4j("http://neo4j:Spectrum42%#localhost:7474");
var Examples = {
  findAll: function(call) {
    const cypher = "MATCH (a:Site) RETURN n LIMIT 2";
    db.cypherQuery(cypher, getReturn);
    function getReturn(err, result) {
      if (err) throw err;
      var resultInt = [];
      for (var i = 0; i < result.data.length; i++) {
        resultInt[i] = result.data[i]._id;
      }
      //console.log(result)
      call(resultInt);
    }
  }
};
module.exports = Examples;