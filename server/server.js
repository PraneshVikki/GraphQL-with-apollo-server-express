const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
app.use(cors(
    {
        origin: ['https://studio.apollographql.com','ws://localhost:4000/graphql','http://localhost:4000/graphql'],
    }
));    
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());    
const typeDefs = require('./graphql/typeDefs'); 
const resolvers = require('./graphql/resolvers');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB connected');
}).catch((err) => { 
    console.log(err); 
});

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req,res }) => ({ req,res,pubsub }) });

const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();