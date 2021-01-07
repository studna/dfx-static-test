import {
  OTHER,
  JEKYLL,
  WORDPRESS,
  MKDOCS,
} from '../../../../../constants';

const getBuildSettings = ({
  rootDirectory,
  packageJson,
  toml,
  hugoFiles,
  fleekJson,
}) => {
  const {
    hasYarnLock,
    hasPackageLock,
    hasWpContent,
    hasGemfile,
    hasMkDocsYml,
  } = rootDirectory;
  const { hasBuildCommand, framework: frameworkFromPackageJson } = packageJson;
  const { tomlCommand, tomlDirectory } = toml;
  const { framework: frameworkFromHugoFiles } = hugoFiles;

  const isPackageManagerNpm = hasPackageLock && !hasYarnLock;

  const installCommand = isPackageManagerNpm ? 'npm install' : 'yarn';
  const runScriptCommand = isPackageManagerNpm ? 'npm run' : 'yarn';

  const buildCommand = (
    (tomlCommand && `${installCommand} && ${tomlCommand}`)
    || (hasBuildCommand && `${installCommand} && ${runScriptCommand} build`)
    || ''
  );

  const nameOfBuildDirectory = tomlDirectory || '';
  const { detected: isFleekConfigDetected, ...fleekConfig } = fleekJson;

  const defaultValues = {
    buildCommand,
    baseDirectory: '',
    publishDirectory: nameOfBuildDirectory,
    dockerImage: '',
    installCommand,
    runScriptCommand,
    ...fleekConfig,
  };

  return ({
    framework: (isFleekConfigDetected && OTHER)
      || frameworkFromPackageJson
      || frameworkFromHugoFiles
      || (hasWpContent && WORDPRESS)
      || (hasGemfile && JEKYLL)
      || (hasMkDocsYml && MKDOCS)
      || OTHER,
    defaultValues,
  });
};

export default getBuildSettings;
