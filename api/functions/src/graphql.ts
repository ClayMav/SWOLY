import "reflect-metadata";

import express from "express";
import * as TypeGraphQL from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { authChecker } from "./auth";
import { printSchema } from "graphql";

function gqlServer() {
  const app = express();

  const schema = TypeGraphQL.buildSchemaSync({
    authChecker,
    resolvers: [`${__dirname}/**/resolver.ts`, `${__dirname}/**/resolver.js`]
  });
  console.log(printSchema(schema));

  const apolloServer = new ApolloServer({
    schema
  });

  apolloServer.applyMiddleware({ app, path: "/", cors: true });

  return app;
}

export { gqlServer };
