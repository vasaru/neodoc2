let neo4j = require("neo4j-driver").v1;
var Network = require("netmask").Netmask;
var uniqid = require('uniqid');

let driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "Spectrum42%")
);

const resolveFunctions = {
  Query: {
    getSiteById(_, params) {
      let session = driver.session();
      let query = "MATCH (site:Site) WHERE site.id = $siteId RETURN site;";
      return session.run(query, params).then(result => {
        return result.records.map(record => {
          return record.get("site").properties;
        });
      });
    },
    getSiteByName(_, params) {
      let session = driver.session();
      let query = "MATCH (site:Site) WHERE site.name = $name RETURN site;";
      return session.run(query, params).then(result => {
        return result.records.map(record => {
          return record.get("site").properties;
        });
      });
    },

    getAllSites(_, params) {
      let session = driver.session();
      let query = "MATCH (site:Site) RETURN site;";
      return session.run(query, params).then(result => {
        return result.records.map(record => {
          return record.get("site").properties;
        });
      });
    },

    getAllNetworks(_, params) {
      let session = driver.session();
      let query = "MATCH (net:Network) RETURN net;";
      return session.run(query, params).then(result => {
        return result.records.map(record => {
          return record.get("net").properties;
        });
      });
    }
  },
  Site: {
    contacts(site) {
      let session = driver.session(),
        params = { id: site.id },
        query = `
                MATCH (s:Site {id : $id})-[r:CONTACT]-(c) return c
            `;
      return session.run(query, params).then(result => {
        return result.records.map(record => {
          return record.get("c").properties;
        });
      });
    }
  },
  Network: {
    ipaddresses(net) {
        console.dir(net);
      let session = driver.session(),
        params = { id: net.networkId },
        query = `
                MATCH (s:Network {networkId : {id}})-[r:IPADDRESS]-(i) return i
            `;
//        console.log(query);
      return session.run(query, params).then(result => {
        return result.records.map(record => {
//            console.log(record.get("i").properties);
          return record.get("i").properties;
        });
      });
    }

  },
  Ipv4Address: {
  },

  Mutation: {
    createNetwork(_, args) {
//      console.log("In createNetwork");
//      console.log(args);
      var net = new Network(args.network, args.netmask);
//      console.dir(net);
      let session = driver.session(),
        params = { 
            networkId: uniqid(),
            name: args.name,
            vlanid: args.vlanid,
            gateway: args.gateway,
            netmask: net.mask,
            size: net.size,
            network: net.base
        }, 
        query = `
                CREATE (n:Network {networkId: {networkId}, name: {name}, gateway: $gateway, network: $network, vlanid: $vlanid})
            `;

        var ipquery="";
        net.forEach(function(ip,long,index) {
            ipquery+="CREATE (ip"+index+":Ipv4Address {ipAddress: \""+ip+"\", ipAddressId: \""+uniqid()+"\"})\n";
            ipquery+="CREATE (n)-[:IPADDRESS]->(ip"+index+")\n";
            ipquery+="CREATE (ip"+index+")-[:NETWORK]->(n)\n";
        })
        query = query+ipquery+"return n"; 
        console.log(query);
        return session.run(query, params).then(result => {
//                console.log(result.records);
                return result.records.map(record => {
//                    console.log(record.get("n").properties);
                    return record.get("n").properties
                });
            }).catch(function(error) {
                console.log(error)
            });
    }
  }
};

module.exports = resolveFunctions;
