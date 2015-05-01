throwError = function() {
  Meteor.apply('throwError', arguments, function(err, result) {
    if (err) {
      console.log("Could not log event to rollbar");
      console.log(err);
    }
  });
};

handleError = function(error) {
  Meteor.apply('handleError', arguments, function(err, result) {
    console.log("Could not log error to rollbar");
    console.log(err);
  });
};