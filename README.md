# POC: SAML-IdP-Lambda

POC that shows SAML 2.0 Web SSO profile in combination with a mock IDP and AWS Lamda for the backend logic. The frontend is done with Angular.

## Scripts

- Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`
- Run `npm run start-saml` to start the mock SAML IDP server on `http://localhost:7000`

## Precondition

### Self-signed certificate for the IdP

In the root folder of the project, you can generate a keypair using the following command (requires openssl in your path):

`openssl req -x509 -new -newkey rsa:2048 -nodes -subj '/C=US/ST=California/L=San Francisco/O=JankyCo/CN=Test Identity Provider' -keyout idp-private-key.pem -out idp-public-cert.pem -days 7300`

Your project directory should then look following:

```
ng-saml-idp-poc/
├── idp-private-key.pem
├── idp-public-cert.pem
├── server/
│   ├── index.js
├── src/
│   ├── app/
├── package.json
```

Further configuration options can be found [here](https://www.npmjs.com/package/saml-idp).

### AWS Lambda functions

