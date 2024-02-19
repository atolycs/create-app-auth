import core from "@actions/core"
import { request } from "@octokit/request"
import { run } from "./src/post.js"

const token = core.getState("token")

run(token, core, request)