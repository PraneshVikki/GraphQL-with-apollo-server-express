const {gql} = require('apollo-server-express');


const typeDefs = gql`
type Post {
    id: ID,
    title: String!,
    content: String,
},
type Query {
    getPosts: [Post]
},
input postInput {
    id: ID,
    title: String!,
    content: String,
},
type Mutation {
    createPost(postInput:postInput!): Post
}
type Subscription {
    newPost: Post
}

interface Animal {
  id: ID!
  name: String!
  species: String!
}

type Dog implements Animal {
  id: ID!
  name: String!
  species: String!
  breed: String!
}

type Cat implements Animal {
  id: ID!
  name: String!
  species: String!
  color: String!
}

`;


module.exports = typeDefs;
