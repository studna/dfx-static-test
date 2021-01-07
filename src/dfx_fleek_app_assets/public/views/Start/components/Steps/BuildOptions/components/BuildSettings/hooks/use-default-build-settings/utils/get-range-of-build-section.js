const MAX_ITERATION_NUMBER = 10;

const getRangeOfBuildSection = (stringifiedToml) => {
  const sectionBeginRegex = /^\[([a-zA-Z.]+)\]/gm;
  let i = 0;
  let startIndex;
  while (i <= MAX_ITERATION_NUMBER) {
    // ^ just if case if user got something strange in toml
    const execResults = sectionBeginRegex.exec(stringifiedToml);

    if (execResults === null) {
      return null; // EOF
    }

    const nameOfSection = execResults['1'];
    if (nameOfSection === 'build') {
      startIndex = sectionBeginRegex.lastIndex;
      break;
    }

    i += 1;
  }

  if (i > MAX_ITERATION_NUMBER) {
    return null; // something was wrong with toml file
  }

  const nextSectionResult = sectionBeginRegex.exec(stringifiedToml);
  const endIndex = nextSectionResult // if there is another section after [build]
    ? nextSectionResult.index // take index of that section
    : stringifiedToml.length; // build was the last section

  const contentOfBuildSection = stringifiedToml.slice(startIndex, endIndex);
  return contentOfBuildSection;
};

export default getRangeOfBuildSection;
