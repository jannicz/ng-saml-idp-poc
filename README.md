# POC: SAML-IdP-Lambda

POC that shows SAML 2.0 Web SSO profile in combination with a mock IDP and AWS Lamda for the backend logic. The frontend is done with Angular.

## Scripts

- Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`
- Run `npm run start-saml` to start the mock SAML IDP server on `http://localhost:7000`

## Prerequisites

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

### AWS Lambda functions and API Gateway

After having created an API Gateway called `saml-api`, under the path
`/saml/login` create 2 methods for GET and POST:

```
/
├── /saml
    ├── /login
        ├── GET
        ├── POST
```

### GET method for saml-auth-function

Assign the GET method to following Lambda function:

```
import querystring from 'querystring';
import { Buffer } from 'buffer';

export const handler = async (event) => {
    const idpUrl = 'http://localhost:7000/saml/sso'; // Your mock IdP URL

    const samlRequest = `
        <samlp:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
            ID=""
            Version="2.0"
            IssueInstant=""
            Destination=""
            AssertionConsumerServiceURL="http://localhost:4200/api/saml/acs">
            <saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">your-app</saml:Issuer>
        </samlp:AuthnRequest>
    `;

    const encodedSamlRequest = Buffer.from(samlRequest).toString('base64');
    const redirectUrl = `${idpUrl}?${querystring.stringify({
        SAMLRequest: encodedSamlRequest,
        RelayState: 'xyz'
    })}`;

    return {
        statusCode: 302,
        headers: {
            Location: redirectUrl
        },
        body: JSON.stringify({
            Location: redirectUrl
        })
    };
};
```

#### Tab Method response

In 'GET - Method execution' create a method response for the code 302
and add a Header with the property name `Location`.

#### Tab Integration response

In 'Default - Response' map the 302 to the method response header field
Location by providing following mapping for the `Location` property: `integration.response.body.headers.Location`.

### POST method saml-acs-function

Assign the POST method to following Lambda function:

```
export const handler = async (event) => {

};
```

## Setup

- Find the api-id and region from the API Gateway console (i.e. https://abc123.execute-api.us-east-1.amazonaws.com/stage/api/method)
- Replace the placeholders `AWS_API_ID` and `AWS_API_REGION` in the `environment.ts` with the real values
