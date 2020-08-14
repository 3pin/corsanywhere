/* load the ENVIRONMENT variables for debug */
require('dotenv').config();

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || 'localhost';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

const options = {}
if (process.env.WHITELIST) {
  options.originWhitelist = process.env.WHITELIST.split(',');
}
if (process.env.BLACKLIST) {
  options.originBlacklist = process.env.BLACKLIST.split(',');
}
if (process.env.REQUIRE_HEADERS === 'true') {
  options.requireHeader = ['Origin'];
  // options.requireHeader = ['origin', 'x-requested-with'];
}
if (process.env.REMOVE_HEADERS === 'true') {
  options.removeHeader = ['cookie', 'cookie2'];
}
if (process.env.SAME_ORIGIN === 'true') {
  options.redirectSameOrigin = true;
}
console.log(options);

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer(options).listen(port, host, function () {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
