const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(path.join(__dirname,'**/*.graphql'));
const resolverArray = loadFilesSync(path.join(__dirname,'**/*.resolvers.js'));

async function startApolloServer() {
    const app = express();

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolverArray
    });

    const server = new ApolloServer({
        schema: schema
    });

    await server.start();
    server.applyMiddleware({app, path: '/graphql'});

    app.listen(3000, () => {
        console.log('running graphQL server....')
    });
}

startApolloServer();