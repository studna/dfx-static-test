import getRangeOfBuildSection from './get-range-of-build-section';

const getDataFromToml = (stringifiedToml) => {
  const contentOfBuildSection = getRangeOfBuildSection(stringifiedToml);
  if (!contentOfBuildSection) { // error or no build section
    return {
      tomlCommand: undefined,
      tomlDirectory: undefined,
    };
  }

  const commandRegex = /^(\s*)command = "(.*)"/m;
  const commandRegexResults = commandRegex.exec(contentOfBuildSection);
  const command = commandRegexResults ? commandRegexResults[2] : '';

  const publishRegex = /^(\s*)publish = "(.*)"/m;
  const publishRegexResults = publishRegex.exec(contentOfBuildSection);
  const publish = publishRegexResults ? publishRegexResults[2] : '';

  return {
    tomlCommand: command,
    tomlDirectory: publish,
  };
};

export default getDataFromToml;
