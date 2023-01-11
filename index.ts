import * as ftp from "basic-ftp"
import * as fs from "fs";

let Client = require('ssh2-sftp-client');
example().then(
    res => {
      console.log({res})
    }
)
    .catch(err => {
      console.error('Vale verga la vida:', err)
    })

// async function example() {
//   const client = new ftp.Client()
//   client.ftp.verbose = true
//   try {
//     await client.access({
//       host: "sftp19.sapsf.com",
//       user: "laborato08-stage",
//       password: "704M4eNcmd@1@aI",
//       secure: true
//     })
//     console.log(await client.list())
//     // await client.uploadFrom("README.md", "README_FTP.md")
//     // await client.downloadTo("README_COPY.md", "README_FTP.md")
//   } catch (err) {
//     console.log(err)
//   }
//   client.close()
// }
async function example() {
  let sftp = new Client();
  let remotePath = '/LBAGO/Satelite.csv';
  let destinyFile = fs.createWriteStream('/tmp/Satelite.csv');
  sftp.connect({
    // port: '8080',
    host: "sftp19.sapsf.com",
    user: "laborato08-stage",
    password: "704M4eNcmd@1@aI",
  }).then(() => {
    return sftp.get(remotePath, destinyFile)
  }).then(() => {
    sftp.end();
  }).catch(err => {
    console.log(err, 'catch error');
  });
}