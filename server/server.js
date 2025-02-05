const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
    origin: ['https://studio.apollographql.com', 'http://localhost:4000'],
    credentials: true
}));    
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());    
const typeDefs = require('./graphql/typeDefs'); 
const resolvers = require('./graphql/resolvers');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const Author = require('./graphql/modules/Author');
const DataLoader = require('dataloader');
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB connected');
}).catch((err) => { 
    console.log(err); 
});

const server = new ApolloServer({ typeDefs, resolvers, context: 
    ({ req, res }) => ({ req,
        res,
        pubsub,

        authorLoader: new DataLoader(async (keys) => {
            const authors = await Author.find({ id: { $in: keys } });
            console.log(keys);
            const authorMap = {};
            authors.forEach(author => {
                authorMap[author.id] = author;
            });
            //console.log(authorMap)
            console.log(keys.map(key => authorMap[key]))
            return keys.map(key => authorMap[key]);
        })
         }) 
});

const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();