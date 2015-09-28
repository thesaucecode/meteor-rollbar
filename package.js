Package.describe({
  name: 'saucecode:rollbar',
  version: '0.5.8',
  summary: 'Rollbar error reporting integrations for Meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.2');

  Npm.depends({
    rollbar: '0.5.8'
  });

  api.use([
    'check',
    'underscore'
  ], 'server');

  api.addFiles('lib/server/rollbar-server.js', 'server');
  api.addFiles('lib/client/rollbar-client.js', 'client');
  api.addAssets('lib/private/client-head.html', 'server');

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
