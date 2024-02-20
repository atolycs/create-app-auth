# create-app-auth

Refer to [actions/create-github-app-token](https://github.com/actions/create-github-app-token) and output addtional commiter infomation action.

[![Testing Action](https://github.com/atolycs/create-app-auth/actions/workflows/ci.yml/badge.svg)](https://github.com/atolycs/create-app-auth/actions/workflows/ci.yml)

## Inputs
* `app-id`: Github App App ID
* `private-key`: Github App Private Key

## Outputs
* `token`: Github App Token
* `commit-user`: Github App bot Commit User
* `commit-email`: Github App bot Commit Email Address

## Uses
```yaml

on:
  push:
    branch:
       - main

jobs:
  review:
     name: Code Test
     runs-on: ubuntu-latest
     steps:
       - name: Generate Token
         uses: atolycs/create-app-auth@v1
         id: generate-token
         with:
           app-id: ${{ secrets.APP_ID }}
           private-key: ${{ secrets.APP_PEM }}
    
    ...
      - name: Commit comment
        uses: ...
        with:
          token: ${{ steps.generate-token.outputs.token }}
    ...
```


Respect [actions/create-github-app-token](https://github.com/actions/create-github-app-token) 

- Directory Style
```
|+ root
 \_ .eslintrc.json  =>
 \_ action.yml      => Github Action Define file
 \_ src             => Script Source
 \_ dist            => Builded Bundle scripts
 \_ README.md       => This file
 \_ package.json    => Nodejs package Define file
```
