import dfx_fleek_app from 'ic:canisters/dfx_fleek_app';

dfx_fleek_app.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
