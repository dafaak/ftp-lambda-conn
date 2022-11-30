import * as ftp from "basic-ftp"

example().then(
    res => {
      console.log(res)
    }
)
    .catch(err => {
      console.error('Vale verga la vida:', err)
    })

async function example() {
  const client = new ftp.Client()
  client.ftp.verbose = true
  try {
    await client.access({
      host: "ftp.dlptest.com",
      user: "dlpuser",
      password: "rNrKYTX9g7z3RgJRmxWuGHbeu",
      secure: false
    })
    console.log(await client.list())
    // await client.uploadFrom("README.md", "README_FTP.md")
    // await client.downloadTo("README_COPY.md", "README_FTP.md")
  } catch (err) {
    console.log(err)
  }
  client.close()
}