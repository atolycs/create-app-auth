import core from "@actions/core"

export async function run(token, request) {
  // Get Generated Token

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
