module.exports = neoDb => {
    return {
        getSite(siteId) {
            console.log("Running query");
            console.log(neoDb);
            neoDb.cypher({
                query: 'MATCH (site:Site) WHERE site.id = 1 RETURN site'}, 
                function(err, results) {
                    if (err) return callback(err);
                    return results.records.map(record => { 
                        console.log(record.get("site").properties);
                        return record.get("site").properties })
                    }); 
                   callback(null, results);
        
        },
        createNetwork() {
            console.log("In create network");
        }
    }
}
