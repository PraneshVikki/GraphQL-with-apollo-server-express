const {gql} = require('apollo-server-express');


const typeDefs = gql`
type Post {
    id: ID,
    title: String!,
    content: String,
},
type Query {
    getPosts: [Post]
    getAnimals: [Animal]
    getDogs: [Dog]
    getCats: [Cat]
    
},
input postInput {
    id: ID,
    title: String!,
    content: String,
},
input animalInput {
    id: ID,
    name: String!,
    breed: String,  
    color: String,
},

type Mutation {
    createPost(postInput:postInput!): Post,
    createAnimal(animalInput:animalInput!): Animal,
    getError: Error
    
}
type Subscription {
    newPost: Post
}

interface Animal {
  id: ID
  name: String!
}

type Dog implements Animal {
  id: ID
  name: String!
  breed: String
}

type Cat implements Animal {
  id: ID
  name: String!
  color: String
}

union Error = ValidationError | TimeoutError

type ValidationError{
  field: String
  message: String
}
type TimeoutError{
  message: String
  timeLimit: Int
}

`;


module.exports = typeDefs;
