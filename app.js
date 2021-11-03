/* load the ENVIRONMENT variables for debug */
require('dotenv').config();

const cors_proxy = require('cors-anywhere');

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

const options = {}

//options.handleInitialRequest();
if (process.env.WHITELIST) {
  options.originWhitelist = process.env.WHITELIST.split(',');
}
if (process.env.BLACKLIST) {
  options.originBlacklist = process.env.BLACKLIST.split(',');
}
if (process.env.REQUIRE_HEADERS) {
  options.requireHeader = process.env.REQUIRE_HEADERS.split(',');
  // options.requireHeader = ['origin', 'x-requested-with'];
}
if (process.env.REMOVE_HEADERS) {
  options.removeHeader = process.env.REMOVE_HEADERS.split(',');
}
if (process.env.SAME_ORIGIN === 'true') {
  options.redirectSameOrigin = true;
}
console.log(options);

cors_proxy.createServer(options).listen(port, host, function () {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
})
