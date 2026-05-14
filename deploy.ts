import { defineConfig, remove } from '@catapultjs/deploy'
import '@catapultjs/deploy/recipes/adonisjs'
import '@catapultjs/deploy/recipes/git'
// import '@catapultjs/deploy/recipes/pm2'

remove('ace:migration:run')

const ssh = process.env.DEPLOY_SSH
const deployPath = process.env.DEPLOY_PATH

if (!ssh) throw new Error('Missing DEPLOY_SSH')
if (!deployPath) throw new Error('Missing DEPLOY_PATH')

export default defineConfig({
  keepReleases: 2,
  hosts: [
    {
      name: 'production',
      ssh,
      deployPath,
      branch: 'master',
    },
  ],
})
