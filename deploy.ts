import {
  defineConfig,
  set,
  remove,
  task,
  // after,
  // before,
  run,
  upload,
  // download,
  local,
  // setPipeline,
} from '@catapultjs/deploy'
import { Verbose, Strategy } from '@catapultjs/deploy/enums'
import '@catapultjs/deploy/recipes/adonisjs'
import '@catapultjs/deploy/recipes/git'
// import '@catapultjs/deploy/recipes/pm2'
// import '@catapultjs/deploy/recipes/rsync'

remove('adonisjs:migrate')

// remove('deploy:healthcheck')

task('test', () => {
  run('ls -la')
  // upload('./tmp/', './')
  // download('./tmp', './')
})

task('my:build', async () => {
  await local('npm run build')
  // await local('node ace', { cwd: './build' })
  await upload('./build', '{{release_path}}/build')
})

// after('deploy:unlock', 'test')
// before('deploy:unlock', 'my:build')

// set('bin/pm2', 'npx pm2')
set('rsync_excludes', [
  '.git',
  'node_modules',
  '.env',
  '.DS_Store',
  '.idea',
  '.vscode',
  '.cursor',
  '.claude',
  'coverage',
  'tmp',
  'logs',
  'storage',
])

export default defineConfig({
  verbose: Verbose.TRACE,
  strategy: Strategy.REMOTE,
  hosts: [
    {
      name: 'production',
      ssh: 'deploy@192.168.122.148',
      deployPath: '/home/deploy/deploy-test',
    },
  ],
})
