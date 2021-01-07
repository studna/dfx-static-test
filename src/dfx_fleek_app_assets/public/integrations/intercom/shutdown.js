export default () => {
  try {
    window.Intercom('shutdown');
  } catch (e) {
    // Ignore if window.Intercom is undefined
  }
};
