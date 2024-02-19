import {request} from "@octokit/request"
import core from "@actions/core"

async function run() {
  // Get Generated Token
  const token = core.getState("token")

  try {
    await request('DELETE /installation/token', {
      headers: {
        authorization: `token ${token}`
      }
    })
    core.info("==> Token Revoked")
  } catch(error) {
    core.setFailed(error.message)
  }
}

export default run()