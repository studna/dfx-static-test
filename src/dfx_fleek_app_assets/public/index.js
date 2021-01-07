import dfx_fleek_app_assets from "ic:canisters/dfx_fleek_app_assets";

const getText = bytes => (
  new TextDecoder().decode(new Uint8Array(bytes))
)

const injectScript = (jsBytes) => {
  const scriptNode = document.createElement('script');
  scriptNode.innerHTML = getText(jsBytes);
  document.body.appendChild(scriptNode)
}

const injectStyle = (jsBytes) => {
  const styleNode = document.createElement('style');
  styleNode.innerHTML = getText(jsBytes);
  document.body.appendChild(styleNode)
}

const getInjectingFunc = (fileName) => {
  if (/\.css$/.test(fileName)) {
    return injectStyle
  }
  if (/\.js$/.test(fileName)) {
    return injectScript
  }
  return (bytes) => console.error('This type of resource is not handled yet: ', fileName, getText(bytes));
}

const injectResources = jsonBytes => {
  const json = JSON.parse(getText(jsonBytes));
  const scriptsToLoad = Object.values(json).flatMap(value => Object.values(value).flatMap(fileNamesList => fileNamesList))

  console.log('scripts to load: ', scriptsToLoad)
  scriptsToLoad.forEach(fileName => {
    dfx_fleek_app_assets.retrieve(fileName).then(getInjectingFunc(fileName))
  })
};


const initInjectingResources = async () => {
  console.log('initInjectingResources');
  const result = await dfx_fleek_app_assets.retrieve('build-manifest.json')
  console.log('const result = await dfx_fleek_app_assets.retrieve()');
  injectResources(result)
}
console.log('bootstrap...');
initInjectingResources();
