
export async function run(token, core, request) {
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
