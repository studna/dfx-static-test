import {
  OTHER,
  GATSBY,
  HUGO,
  NEXT_JS,
  CREATE_REACT_APP,
  JEKYLL,
  WORDPRESS,
  NUXT_JS,
  GRIDSOME,
  MKDOCS,
  SAPPER,
  SVELTE,
  WASM_PACK,
} from '../../../constants';

const getSettingsByFramework = (defaults) => ({
  [OTHER]: {
    framework: OTHER,
    ...defaults,
  },
  [GATSBY]: {
    framework: GATSBY,
    buildCommand: defaults.buildCommand || 'yarn && yarn build',
    publishDirectory: 'public',
    dockerImage: 'fleek/gatsby',
  },
  [HUGO]: {
    framework: HUGO,
    buildCommand: 'hugo',
    publishDirectory: 'public',
    dockerImage: 'fleek/hugo',
  },
  [NEXT_JS]: {
    framework: NEXT_JS,
    buildCommand: 'npm install && npm run build && npm run export',
    publishDirectory: 'out',
    dockerImage: 'fleek/next-js',
  },
  [CREATE_REACT_APP]: {
    framework: CREATE_REACT_APP,
    buildCommand: defaults.buildCommand || 'yarn && yarn build',
    publishDirectory: 'build',
    dockerImage: 'fleek/create-react-app',
  },
  [JEKYLL]: {
    framework: JEKYLL,
    buildCommand: 'jekyll build',
    publishDirectory: '_site',
    dockerImage: 'fleek/jekyll',
  },
  [NUXT_JS]: {
    framework: NUXT_JS,
    buildCommand: `${defaults.installCommand} && ${defaults.runScriptCommand} build && ${defaults.runScriptCommand} export`,
    publishDirectory: 'dist',
    dockerImage: 'fleek/nuxtjs',
  },
  [WORDPRESS]: {
    framework: WORDPRESS,
    buildCommand: '',
    publishDirectory: '',
    dockerImage: '',
  },
  [GRIDSOME]: {
    framework: GRIDSOME,
    buildCommand: defaults.buildCommand || 'yarn && yarn build',
    publishDirectory: 'dist',
    dockerImage: 'fleek/gridsome:node-12',
  },
  [SVELTE]: {
    framework: SVELTE,
    buildCommand: defaults.buildCommand || 'yarn && yarn build',
    publishDirectory: 'public',
    dockerImage: 'fleek/svelte',
  },
  [MKDOCS]: {
    framework: MKDOCS,
    buildCommand: defaults.buildCommand || 'mkdocs build',
    publishDirectory: 'site',
    dockerImage: 'fleek/mkdocs',
  },
  [SAPPER]: {
    framework: SAPPER,
    buildCommand: `${defaults.installCommand} && ${defaults.runScriptCommand} export`,
    publishDirectory: '__sapper__/export',
    dockerImage: 'fleek/svelte',
  },
  [WASM_PACK]: {
    framework: WASM_PACK,
    buildCommand: defaults.buildCommand || 'yarn && yarn build',
    publishDirectory: 'dist',
    dockerImage: 'fleek/wasm-pack',
  },
});

export default getSettingsByFramework;
