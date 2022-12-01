import * as ftp from "basic-ftp"
import * as lambda from 'aws-lambda';
import * as fs from 'fs';

exports.handler = async (event: lambda.APIGatewayProxyEvent, serverlessContext: lambda.Context) => {
  serverlessContext.callbackWaitsForEmptyEventLoop = false
  try {
    const res = await example();
    return res;
  } catch (e) {
    return e;
  }


}

async function example() {
  const client = new ftp.Client()
  client.ftp.verbose = true
  let res = {};
  try {
    await client.access({
      host: "ftp.dlptest.com",
      user: "dlpuser",
      password: "rNrKYTX9g7z3RgJRmxWuGHbeu",
      secure: false
    })
    await client.uploadFrom("README.txt", "README_FTP.txt")
    await client.downloadTo("/tmp/README_COPY.txt", "README_FTP.txt")
    console.log(leerArchivoDeTmp('README_COPY.txt'));

  } catch (err) {
    res = {status: 500, body: {mensaje: 'Algo salio mal!:', err}}
    console.log(err)
  }
  client.close()
  return res;
}

function leerArchivoDeTmp(nombreArchivo: string) {
  return fs.readFileSync(`/tmp/${nombreArchivo}`, 'utf-8');
}
