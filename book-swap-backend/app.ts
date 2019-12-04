import express = require('express');
import bodyParser = require('body-parser');
import graphqlHttp = require('express-graphql');
import mongoose = require('mongoose');

/**
 * setting up the certificate
 */
import fs = require('fs');
import http = require('http');
import https = require('https');
const privateKey = fs.readFileSync('certificate/key.pem', 'utf8');
const certificate = fs.readFileSync('certificate/cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

import graphQlSchema from './src/graphql/schema/index';
import graphQlResolvers = require('./src/graphql/resolvers');
import { isAuth } from './src/middleware/is-auth';

const app = express();

app.use(bodyParser.json());

app.use((req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Aceess-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  }),
);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0-beseo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    {
      useNewUrlParser: true,
    },
  )
  .then(() => {
    httpsServer.listen(3001);
    httpServer.listen(3002);
  })
  .catch((e: any) => {
    // tslint:disable-next-line: no-console
    console.log(e);
  });
