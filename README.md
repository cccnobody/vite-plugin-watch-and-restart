# Usage

Install

```bash
npm i vite-plugin-watch-and-restart -D # yarn add vite-plugin-watch-and-restart -D
```

Add it to `vite.config.js`

```ts
// vite.config.js
import ViteWatchRestart from 'vite-plugin-watch-and-restart'

export default {
  plugins: [
    ViteWatchRestart({
      path: 'src/index.ts',
      isForce: false,
      delay: 500,
    })
  ],
}
```

Changes to `src/index.ts` will restart the server automatically after 500ms.

You can set the `isForce` to `true` to force dependency pre-bundling, ignoring previously cached optimized dependencies.

This may be useful if you use `yalc` to debug local packages in your Vite project.
