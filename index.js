import core from "@actions/core";
import { request } from "@octokit/request"
import { createAppAuth } from "@octokit/auth-app"
import { App } from "octokit"

import { main } from "./src/main.js"

const appId = core.getInput("app-id") || core.getInput("app_id")
const privateKey = core.getInput("private-key") || core.getInput("private_key")

core.debug(`APP_ID=> ${appId}`)
core.debug(`PRIVATE_KEY=> ${privateKey}`)

main(appId, privateKey, core, createAppAuth, App, request).catch(error => {
  core.setFailed(error.message)
})
