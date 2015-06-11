Meteor.startup(function() {
  Tracker.autorun(function() {
    if (Meteor.userId() && Meteor.user()) {
      Rollbar.configure({
        payload: {
          person: {
            id: Meteor.userId(),
            username: Meteor.user().profile && Meteor.user().profile.name
          }
        }
      });
    } else {
      Rollbar.configure({
        payload: {
          person: null
        }
      });
    }
  });
});

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