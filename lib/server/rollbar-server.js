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

//
throwError = function(message) {
  check(message, String);
  var exceptionDetails = arguments.length > 1  ? arguments[1] : {};
  var logLevel = arguments.length > 2 ? arguments[2] : 'error';
  check(exceptionDetails, Object);
  check(logLevel, String);
  rollbar.reportMessageWithPayloadData(message, {
    level: logLevel,
    custom: exceptionDetails
  }, {}, function(err) {
    if (err) {
      console.log("thesaucecode:rollbar: failed to throw error to rollbar.");
      console.log(err);
    }
  });
};

handleError = function(error) {
  var payloadData = arguments.length > 1 ? arguments[1] : {};
  var logLevel = arguments.length > 2 ? arguments[2] : 'error';
  check(payloadData, Object);
  check(logLevel, String);
  rollbar.handleErrorWithPayloadData(error, {
    level: logLevel, 
    custom: payloadData
  }, function(err) {
    if (err) {
      console.log("thesaucecode:rollbar: failed to post error to rollbar.");
      console.log(err);
    }
  });
};

var methods = {
  logClientError: function(method, arguments) {
    var fn = rollbar[method]
    if (fn)
      fn.apply(this, arguments);
  },
  getRollbarClientConfig: function() {
    return {
      accessToken: rollbarClientAccessToken,
      captureUncaught: true,
      payload: {
        environment: rollbarEnvironment || "production"
      }
    };
  },
  throwError: function() {
    check(arguments, [Match.Any]);
    throwError.apply(this, arguments); // Using apply to use array of args
  },
  handleError: function() {
    check(arguments, [Match.Any]);
    handleError.apply(this, arguments);
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
    } else {
      rollbar.init(rollbarServerAccessToken);
    }
    Meteor.methods(methods);
  } else {
    reportAPIConnectionNotPossible();
  }
});
