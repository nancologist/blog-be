// /*
// Administrator credentials:
// USR: ADMIN
// PWD: !ifj9Yny7dH8D4P
// --------------------------

// Wallet pwd: il0veher
// --------------------------

// Connection String:
// {
//   TNS Name: blogdb_high,
//   Connection String: (description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=gf37b6ce441850b_blogdb_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adwc.eucom-central-1.oraclecloud.com, OU=Oracle BMCS FRANKFURT, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))
// }
// */

// const oracledb = require('oracledb');

// oracledb.initOracleClient({ libDir: process.env.HOME + '/Downloads/instantclient_19_8' });

// async function run() {

//   let connection;

//   try {

//     connection = await oracledb.getConnection({
//       user: "admin",
//       password: "!ifj9Yny7dH8D4P", 
//       connectionString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=gf37b6ce441850b_blogdb_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adwc.eucom-central-1.oraclecloud.com, OU=Oracle BMCS FRANKFURT, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))'
//     });

//     // Create a table

//     await connection.execute(`begin
//                                 execute immediate 'drop table nodetab';
//                                 exception when others then if sqlcode <> -942 then raise; end if;
//                               end;`);

//     await connection.execute(`create table nodetab (id number, data varchar2(20))`);

//     // Insert some rows

//     const sql = `INSERT INTO nodetab VALUES (:1, :2)`;

//     const binds =
//       [ [1, "First" ],
//         [2, "Second" ],
//         [3, "Third" ],
//         [4, "Fourth" ],
//         [5, "Fifth" ],
//         [6, "Sixth" ],
//         [7, "Seventh" ] ];

//     await connection.executeMany(sql, binds);

//     connection.commit();     // uncomment to make data persistent

//     // Now query the rows back

//     const result = await connection.execute(`SELECT * FROM nodetab`);

//     console.dir(result.rows, { depth: null });

//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }

// run();