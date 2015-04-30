Package.describe({
  name: 'thesaucecode:rollbar',
  version: '0.0.1',
  summary: 'Rollbar error integrations for Meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('rollbar.js');
});

