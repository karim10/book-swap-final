const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

/**
 * setting up the certificate
 */
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('certificate/key.pem', 'utf8');
const certificate = fs.readFileSync('certificate/cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Aceess-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
})

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0-beseo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    httpsServer.listen(3001);
    httpServer.listen(3002);
  }
  )
  .catch(e => {
    console.log(e);
  });
