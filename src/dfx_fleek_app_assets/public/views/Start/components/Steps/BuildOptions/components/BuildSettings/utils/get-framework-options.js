import {
  OTHER,
  GATSBY,
  HUGO,
  NEXT_JS,
  CREATE_REACT_APP,
  WORDPRESS,
  JEKYLL,
  GRIDSOME,
  SVELTE,
  MKDOCS,
  NUXT_JS,
  SAPPER,
  WASM_PACK,
} from '../../../constants';

const getFrameworkOptions = (t) => ([
  {
    id: OTHER,
    name: t('sites.start.buildOptions.frameworkOptions.other'),
    showNoImage: true,
  },
  {
    id: NEXT_JS,
    name: t('sites.start.buildOptions.frameworkOptions.nextJs'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/nextjs.png',
  },
  {
    id: CREATE_REACT_APP,
    name: t('sites.start.buildOptions.frameworkOptions.createReactApp'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/cra.png',
  },
  {
    id: HUGO,
    name: t('sites.start.buildOptions.frameworkOptions.hugo'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/hugo.png',
  },
  {
    id: GATSBY,
    name: t('sites.start.buildOptions.frameworkOptions.gatsby'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/gatsby.png',
  },
  {
    id: WORDPRESS,
    name: t('sites.start.buildOptions.frameworkOptions.wordpress'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/wp.png',
  },
  {
    id: NUXT_JS,
    name: t('sites.start.buildOptions.frameworkOptions.nuxtjs'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/nuxtjs.png',
  },
  {
    id: JEKYLL,
    name: t('sites.start.buildOptions.frameworkOptions.jekyll'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/jekyll.png',
  },
  {
    id: GRIDSOME,
    name: t('sites.start.buildOptions.frameworkOptions.gridsome'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/gridsome.png',
  },
  {
    id: SVELTE,
    name: t('sites.start.buildOptions.frameworkOptions.svelte'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/svelte.png',
  },
  {
    id: MKDOCS,
    name: t('sites.start.buildOptions.frameworkOptions.mkdocs'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/mkdocs.png',
  },
  {
    id: SAPPER,
    name: t('sites.start.buildOptions.frameworkOptions.sapper'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/sapper.png',
  },
  {
    id: WASM_PACK,
    name: t('sites.start.buildOptions.frameworkOptions.wasmPack'),
    image: 'https://storage.googleapis.com/terminal-assets/images/frameworks/wasm-pack.png',
  },
]);


export default getFrameworkOptions;
