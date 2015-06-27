Package.describe({
  name: 'saucecode:rollbar',
  version: '0.0.7',
  summary: 'Rollbar error reporting integrations for Meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  Npm.depends({
    'rollbar': '0.5.4'
  });

  api.use('check', 'server');
  
  api.addFiles('lib/server/rollbar-server.js', 'server');
  api.addFiles('lib/client/rollbar-client.js', 'client');
  api.addFiles('lib/private/client-head.html', 'server', { isAsset: true });

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

