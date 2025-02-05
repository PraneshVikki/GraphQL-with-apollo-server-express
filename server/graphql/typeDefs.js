const {gql} = require('apollo-server-express');


const typeDefs = gql`
type Post {
    id: ID!,
    title: String!,
    content: String,
    author_id: ID!
},
type PostDetails{
    id: ID,
    title: String!,
    content: String,
    author: [Author]
}

type Query {
    getPosts: [Post]
    getAnimals: [Animal]
    getDogs: [Dog]
    getCats: [Cat]
    isUser: isUser
    getPostDetails(id: ID!): PostDetails
    getAllPostDetails:[PostDetails!]
},

type Author{
    id: ID!,
    name: String!
}

input postInput {
    id: ID!,
    title: String!,
    content: String,
    author_id: ID!
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
    signup(SignupInput: SignupInput!): User   
    signIn(SigninInput: SigninInput!): User
    createAuthor(AuthorInput: AuthorInput!): Author!
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

type User{
  id: ID
  name: String!
  email: String!
  password: String!
  token: String
}

input SignupInput{
  id: ID
  name: String!
  email: String!
  password: String!
  token: String
}

input SigninInput{
  email: String!
  password: String!
}

type isUser{
  checkUser: Boolean!
}

input AuthorInput{
  id: ID!
  name: String!
}

type Author{
  id: ID!
  name: String!
}

`;


module.exports = typeDefs;
