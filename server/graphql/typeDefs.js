const {gql} = require('apollo-server-express');


const typeDefs = gql`
type Post {
    id: ID!,
    title: String!,
    content: String,
},
type Query {
    getPosts: [Post]
},
input postInput {
    id: ID!,
    title: String!,
    content: String,
},
type Mutation {
    createPost(postInput:postInput!): Post
}
`;

module.exports = typeDefs;
