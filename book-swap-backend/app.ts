import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHttp from 'express-graphql';
import * as mongoose from 'mongoose';

/**
 * setting up the certificate
 */
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

const privateKey = fs.readFileSync('certificate/key.pem', 'utf8');
const certificate = fs.readFileSync('certificate/cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

import graphQlSchema from './src/graphql/schema/index';
import graphQlResolvers = require('./src/graphql/resolvers');
import { isAuth } from './src/middleware/is-auth';
import { getIpAddress } from './utils';

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
    httpServer.listen(3001);
  })
  .catch((e: any) => {
    // tslint:disable-next-line: no-console
    console.log(e);
  });
