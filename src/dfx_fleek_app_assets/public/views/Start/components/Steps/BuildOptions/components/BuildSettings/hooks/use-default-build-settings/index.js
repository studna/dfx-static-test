import { useEffect, useReducer } from 'react';
import get from 'lodash/get';
import { useOctokit } from '@Shared';
import {
  GATSBY,
  HUGO,
  CREATE_REACT_APP,
  NEXT_JS,
  NUXT_JS,
  GRIDSOME,
  SVELTE,
  SAPPER,
  WASM_PACK,
} from '../../../../constants';
import getDataFromToml from './utils/get-data-from-toml';
import getBuildSettings from './utils/get-build-settings';

const getToml = async (fetchRepoContent, setState) => {
  try {
    const netlifyToml = await fetchRepoContent({
      path: 'netlify.toml',
    }).then((result) => {
      const stringifiedContent = Buffer.from(result.data.content, 'base64').toString();
      return stringifiedContent;
    });
    setState({
      toml: getDataFromToml(netlifyToml),
    });
  } catch (error) {
    setState({
      toml: {},
    });
  }
};

const getPackageJson = async (fetchRepoContent, setState) => {
  try {
    const packageJsonContent = await fetchRepoContent({
      path: 'package.json',
    }).then((result) => {
      const stringifiedContent = Buffer.from(result.data.content, 'base64').toString();
      const json = JSON.parse(stringifiedContent);
      return json;
    });

    let framework = null;

    if (get(packageJsonContent, 'dependencies.gatsby')) {
      framework = GATSBY;
    } else if (get(packageJsonContent, 'dependencies.react-scripts')) {
      framework = CREATE_REACT_APP;
    } else if (get(packageJsonContent, 'dependencies.next')) {
      framework = NEXT_JS;
    } else if (get(packageJsonContent, 'dependencies.nuxt')) {
      framework = NUXT_JS;
    } else if (get(packageJsonContent, 'dependencies.gridsome')) {
      framework = GRIDSOME;
    } else if (get(packageJsonContent, 'devDependencies.sapper') || get(packageJsonContent, 'dependencies.sapper')) {
      framework = SAPPER;
    } else if (get(packageJsonContent, 'devDependencies.svelte') || get(packageJsonContent, 'dependencies.svelte')) {
      framework = SVELTE;
    } else if (get(packageJsonContent, 'devDependencies.@wasm-tool/wasm-pack-plugin') || get(packageJsonContent, 'dependencies.@wasm-tool/wasm-pack-plugin')) {
      framework = WASM_PACK;
    }

    setState({
      packageJson: {
        hasBuildCommand: !!get(packageJsonContent, 'scripts.build'),
        framework,
      },
    });
  } catch (error) {
    setState({
      packageJson: {},
    });
  }
};

const getFleekJson = async (fetchRepoContent, setState) => {
  try {
    const fleekJsonContent = await fetchRepoContent({
      path: '.fleek.json',
    }).then((result) => {
      const stringifiedContent = Buffer.from(result.data.content, 'base64').toString();
      const json = JSON.parse(stringifiedContent);
      return json;
    });

    const envVarsObject = get(fleekJsonContent, 'build.environment', {});
    const envVars = Object.entries(envVarsObject)
      .map(([name, value]) => ({ name, value }));

    setState({
      fleekJson: {
        dockerImage: get(fleekJsonContent, 'build.image', ''),
        publishDirectory: get(fleekJsonContent, 'build.publicDir', ''),
        buildCommand: get(fleekJsonContent, 'build.command', ''),
        envVars,
        detected: true,
      },
    });
  } catch (error) {
    setState({
      fleekJson: {
        detected: false,
      },
    });
  }
};

const getRootDirectory = async (fetchRepoContent, setState) => {
  try {
    const { data: rootDirectory } = await fetchRepoContent();
    const hasYarnLock = !!rootDirectory.find(
      ({ name }) => name === 'yarn.lock',
    );
    const hasPackageLock = !!rootDirectory.find(
      ({ name }) => name === 'package-lock.json',
    );
    const hasWpContent = !!rootDirectory.find(
      ({ name }) => name === 'wp-content',
    );
    const hasGemfile = !!rootDirectory.find(
      ({ name }) => name === 'Gemfile',
    );
    const hasMkDocsYml = !!rootDirectory.find(
      ({ name }) => name === 'mkdocs.yml',
    );
    setState({
      rootDirectory: {
        hasYarnLock,
        hasPackageLock,
        hasWpContent,
        hasGemfile,
        hasMkDocsYml,
      },
    });
  } catch (error) {
    setState({
      rootDirectory: {},
    });
  }
};

const getHugoFiles = async (fetchRepoContent, setState) => {
  let framework = null;
  try {
    await fetchRepoContent({
      path: 'archetypes/default.md',
    });
    framework = HUGO;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('No hugo configuration found');
  }

  setState({
    hugoFiles: {
      framework,
    },
  });
};

const useDefaultBuildSettings = (options) => {
  const { repos } = useOctokit();
  const fetchRepoContent = (overrideOptions = {}) => repos.getContents({
    ...options,
    ...overrideOptions,
  });
  const [state, setState] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {},
  );

  const {
    rootDirectory,
    packageJson,
    toml,
    hugoFiles,
    fleekJson,
  } = state;
  const isFullState = rootDirectory && packageJson && toml && hugoFiles && fleekJson;

  useEffect(() => {
    if (options.ref && !isFullState) {
      getRootDirectory(fetchRepoContent, setState);
      getPackageJson(fetchRepoContent, setState);
      getToml(fetchRepoContent, setState);
      getHugoFiles(fetchRepoContent, setState);
      getFleekJson(fetchRepoContent, setState);
    }
  }, [options.ref]);


  if (!isFullState) {
    return null;
  }
  return getBuildSettings(state);
};

export default useDefaultBuildSettings;
