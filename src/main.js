
export async function main(
  appID, 
  privateKey, 
  core, 
  createAppAuth, 
  App,
  request) {
  let codeOwner, parsedRepository

  [codeOwner, parsedRepository] = String(process.env.GITHUB_REPOSITORY).split("/")

  // debug print codeowner and parsedRepository
  core.debug("==> Get codeOwner and parsedRepository")
  core.debug(`==> ${codeOwner}`)
  core.debug(`==> ${parsedRepository}`)

  // Create App Authentication

  core.info("==> Setup Token")
  const auth = createAppAuth({
    appId: appID,
    privateKey: privateKey,
    request: request.defaults()
  })
  core.debug("==> Authing first")

  const auth_app_token = await auth({
    type: "app",
  })


  // Get Github App bot User infomation
  core.info(`==> Getting App Bot User Information via ${codeOwner} Installation ID...`)
  core.debug("==> Correctting User Installation ID...")
  let { data } = await request('GET /users/{username}/installation', {
    username: codeOwner,
    request: {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        authorization: auth_app_token.token
      },
      hook: auth.hook
    }
  })

  core.setSecret(data.id)
  core.debug(`==> Corrected User Installation ID to ${data.id}`)
    
  // API Access
  const app = new App({
    appId: appID,
    privateKey: privateKey,
  })

  // Get Octokit
  const octokit = await app.getInstallationOctokit(data.id)

  // Get bot authenticated data
  let bot_app_info = (await octokit.rest.apps.getAuthenticated()).data

  const search_bot_name = `${bot_app_info.slug}[bot]`
  const bot_data = (await octokit.request('GET /users/{username}', { username: search_bot_name })).data

  // Building Bot user infomation
  const bot_user_id = bot_data.id
  const bot_user_login = bot_data.login
  const bot_commit_email = `${bot_user_id}+${bot_user_login}@users.noreply.github.com`

  core.info("==> Builded Bot User Information")
  core.info("==> Sign in Infomation")
  core.info(`==> Commit Name: ${bot_user_login}`)
  core.info(`==> Commit Email: ${bot_commit_email}`)


  // Revoke User installation Token
  core.debug("==> Revoking User Installation ID ...")
  octokit.rest.apps.revokeInstallationAccessToken()

  core.debug("==> Revoked User Installation ID")
    
  // Get Repository Installation Token

  core.info("==> Getting Repository Installation Token")

  const response = await request('GET /repos/{owner}/{repo}/installation', {
    owner: codeOwner,
    repo: parsedRepository.split(',')[0],
    request: {
      hook: auth.hook
    }
  })

  const authentication = await auth({
    type: 'installation',
    installationId: response.data.id,
    repositoryNames: parsedRepository.split(',')
  })

  core.info("==> Token generated")
  core.setSecret(authentication.token)
  core.setOutput("token", authentication.token)
  core.setOutput("commit-name", bot_user_login)
  core.setOutput("commit-email", bot_commit_email)
  core.saveState("token", authentication.token)
}

