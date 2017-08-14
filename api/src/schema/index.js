const { makeExecutableSchema }= require('graphql-tools');

const resolvers = require('./resolvers/site');

const schema = `
type Site {
        siteId: Int!
        name: String
        address: String
        contacts: [Contact]
}

type Contact {
  contactId: Int!
  name: String!
  phone1: String
  phone2: String
  email: String
  email2: String
  description: String
}

type Network {
  networkId: String!
  name: String!
  vlanid: Int
  gateway: String
  netmask: String
  broadcast: String
  network: String!
  description: String
  ipaddresses: [Ipv4Address]
}

type Ipv4Address {
  ipAddressId: String!
  ipAddress: String!
  sortIndex: Int
  network: [Network]
}

type Query {
  getSiteById(siteId: Int!): [Site]
  getSiteByName(name: String!): [Site]
  getAllSites: [Site]
  
  getNetworkByVlanId(vlanId: Int!): [Network]
  getNetworkByName(name: String!): [Network]
  getAllNetworks: [Network]
}

type Mutation {
  createNetwork (
    name: String!
    vlanid: Int
    gateway: String
    netmask: String
    broadcast: String
    network: String
    description: String
  ): [Network]
}

schema {
  query: Query
  mutation: Mutation
}
`;

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
})



