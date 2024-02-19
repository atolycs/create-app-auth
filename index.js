import { request } from "@octokit/request"
import core from "@actions/core"
import { run } from "./src/main"

const appId = core.getInput("app-id")
const privateKey = core.getInput("private-key")

run(appId, privateKey, request).catch(error => {
  core.setFailed(error.message)
})
