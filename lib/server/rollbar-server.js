var rollbar = Npm.require("rollbar");

var environmentVarsRequired = [
  'ROLLBAR_SERVER_ACCESS_TOKEN',
  'ROLLBAR_CLIENT_ACCESS_TOKEN'
];

rollbarServerAccessToken = null;
rollbarClientAccessToken = null;

var allNecessaryKeysAvailable = function() {
  return _.reduce(_.map(environmentVarsRequired, function(envVar) {
    return !_.isUndefined(process.env[envVar]);
  }), function(memo, item) {
    return memo && item;
  }, true);
};

var reportAPIConnectionNotPossible = function() {
  var message = '';
  message = "Cannot connect to Rollbar API as the following environment variables are not available: [ "
    + environmentVarsRequired.join(', ') + " ]";
  console.log(message);
};

var methods = {
  logClientError: function(message, error) {
  }
};

Meteor.startup(function() {
  if (allNecessaryKeysAvailable()) {
    rollbarServerAccessToken = process.env["ROLLBAR_SERVER_ACCESS_TOKEN"];
    rollbarClientAccessToken = process.env["ROLLBAR_CLIENT_ACCESS_TOKEN"];
    rollbarEnvironment = process.env["ROLLBAR_ENVIRONMENT"];
    if (rollbarEnvironment) {
      rollbar.init(rollbarServerAccessToken, {
        environment: rollbarEnvironment
      });
    }
    rollbar.init(rollbarServerAccessToken);
  
    Meteor.methods(methods);
  } else {
    reportAPIConnectionNotPossible();
  }
});
