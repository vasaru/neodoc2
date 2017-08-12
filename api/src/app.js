var express = require('express');
var graphqlHTTP = require('express-graphql');
var bodyParser = require('body-parser');
var passport = require('passport');
var graphql = require('graphql');
var neo4j = require('neo4j');
var morgan = require('morgan');
var bcrypt = require('bcrypt-nodejs');
var cors = require('cors');


const schema = require('./schema');


var config = require(__dirname + '/config.js');



const app = express().use('*', cors());

app.use('/graphql', bodyParser.json(), graphqlHTTP({
  schema,
  graphiql: true,
  context: {}
}));

app.listen(config.express.port, 'localhost');
console.log('Listening on port ' + config.express.port);

