/*var makeExectutableSchema = require('graphql-tools');

const SiteNode = `
    type Site {
        siteId: Int!
        name: String
        address: String
        contactInfo: String
    }

    type Query {
        site(id: Int!): [Site]
    }

    schema {
        query: Query
    }

`;

export default typeDefs;
*/

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'SiteNode',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        contactInfo: { type: GraphQLString }
    }
});

