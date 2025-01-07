const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
app.use(cors());    
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());    
const typeDefs = require('./graphql/typeDefs'); 
const resolvers = require('./graphql/resolvers');

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB connected');
}).catch((err) => { 
    console.log(err); 
});

const server = new ApolloServer({ typeDefs, resolvers });

async ()=>{
    await server.start();
    server.applyMiddleware({ app });
};

app.listen(3001, () => {   
    console.log('Server is running on port 3000');  
});