Package.describe({
  name: 'saucecode:rollbar',
  version: '0.0.1',
  summary: 'Rollbar error reporting integrations for Meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  Npm.depends({
    'rollbar': '0.5.3'
  });

  api.use('check', 'server');
  
  api.addFiles('lib/server/rollbar-server.js', 'server');

  api.addFiles('lib/rollbar.js', ['client', 'server']);
  api.addFiles('lib/client/rollbar-client.js', 'client');

  api.export([
    'throwError',
    'handleError'
  ], 'client');

  api.export([
    'rollbar',
    'throwError',
    'handleError'
  ], 'server');
});

