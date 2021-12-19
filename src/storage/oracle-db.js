/*
Administrator credentials:
USR: ADMIN
PWD: !ifj9Yny7dH8D4P
--------------------------

Wallet pwd: il0veher
--------------------------

Connection String:
{
  TNS Name: blogdb_high,
  Connection String: (description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=gf37b6ce441850b_blogdb_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adwc.eucom-central-1.oraclecloud.com, OU=Oracle BMCS FRANKFURT, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))
}
*/

const oracledb = require('oracledb');

const mypw = '!ifj9Yny7dH8D4P'

oracledb.autoCommit = true;

module.exports = async () => {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : "admin",
      password      : mypw,
      connectString : '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=gf37b6ce441850b_blogdb_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adwc.eucom-central-1.oraclecloud.com, OU=Oracle BMCS FRANKFURT, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))'
    });

    // // Create a new (or open an existing) document collection
    // const soda = connection.getSodaDatabase();
    // const collectionName = 'nodb_soda_collection';
    // const myCollection = await soda.createCollection(collectionName);

    // // Insert a new document
    // const myContent = { name: "Sally", address: {city: "Melbourne"} };
    // await myCollection.insertOne(myContent);

    // // Print names of people living in Melbourne
    // const filterSpec = { "address.city": "Melbourne" };
    // const myDocuments = await myCollection.find().filter(filterSpec).getDocuments();
    // myDocuments.forEach(function(element) {
    //   const content = element.getContent();
    //   console.log(content.name + ' lives in Melbourne.');
    // });

  } catch(err) {
    console.log('Error in processing:\n', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log('Error in closing connection:\n', err);
      }
    }
  }
}
