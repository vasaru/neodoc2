const { makeExecutableSchema }= require('graphql-tools');

const resolvers = require('./resolvers/site');

const schema = `
type Site {
  siteId: String!
  name: String!
  address: String
  location: String
  contacts: [Contact]
}

type Contact {
  contactId: String!
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
  getAllContacts: [Contact]
  
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
  createSite (
    siteId: String
    name: String!
    address: String
    location: String
  ): [Site]
  createContact (
    contactId: String
    name: String!
    address: String
    phone1: String
    phone2: String
    email: String
    email2: String
    description: String
  ): [Contact]
  linkContactToSite (
    siteId: String!
    contactId: String!
  ): [Site]
  
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



