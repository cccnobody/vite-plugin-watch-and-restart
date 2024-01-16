import fs from 'node:fs'
import process from 'node:process'
import console from 'node:console'
import chalk from 'chalk'
import debounce from 'lodash/debounce'
import type { Plugin } from 'vite'

export interface VitePluginWatchARestartOptions {
  /**
   * The file or folder path to watch.
   */
  path: string
  /**
   * @default false
   *
   * Set to true to force dependency pre-bundling, ignoring previously cached optimized dependencies.
   */
  isForce?: boolean
  /**
   * @default 500
   *
   * Set the service to restart after 500ms.
   */
  delay?: number
}

function VitePluginWatchAndRestart(options: VitePluginWatchARestartOptions): Plugin {
  const { path = '', isForce = false, delay = 500 } = options

  return {
    name: 'vite-plugin-watch-and-restart',
    configureServer(server) {
      if (!path)
        return
      const rootPath = process.cwd()
      const watchPath = `${rootPath}/${path}`
      const debouncedStart = debounce(() => {
        console.log(chalk.blue('Files have changed! Restarting Vite server...'))
        server.restart(isForce)
      }, delay)
      try {
        if (fs.existsSync(watchPath)) {
          server.watcher.on('change', () => {
            debouncedStart()
          })
          server.watcher.on('add', () => {
            debouncedStart()
          })
          server.watcher.on('unlink', () => {
            debouncedStart()
          })
        } else {
          console.log(chalk.red(`${watchPath} not exist!`))
        }
      }
      catch (e) {
        console.log(chalk.red(`vite-plugin-watch-and-restart error: ${e}`))
      }
    },
  }
}

export default VitePluginWatchAndRestart
