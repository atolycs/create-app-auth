import core from "@actions/core"
import { request } from "@octokit/request"
import { run } from "./src/post"

const token = core.getState("token")

run(token, request)