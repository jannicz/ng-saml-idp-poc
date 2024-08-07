const { runServer } = require('saml-idp');
const fs = require('fs');
const path = require('path');

console.log('Starting saml-idp...');
 
runServer({
  issuer: 'mock-idp',
  acsUrl: `http://localhost:4200/api/saml/acs`,
  audience: `https://your-sp-entity-id`,
  serviceProviders: [
    {
      issuer: 'your-app',
      acsUrl: 'http://localhost:4200/api/saml/acs'
    }
  ],
  users: [
    {
      email: 'test@example.com',
      nameId: 'testuser'
    }
  ]
});
