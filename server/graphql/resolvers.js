const { get } = require('mongoose');
const Post = require('./modules/posts');
const { subscribe } = require('graphql');
const dotenv = require('dotenv');   
const { PubSub } = require('graphql-subscriptions')
dotenv.config();

//const pubsub = new PubSub();
const resolvers = {
    Query :{
        getPosts: async () => {
            return await Post.find({});
        }
    },
    Mutation :{
        createPost: async (_, args,{pubsub}) => {
            const argsPost = {
                id: args.postInput.id,
                title: args.postInput.title,
                content: args.postInput.content
            }
            console.log(pubsub);
            
            const post = new Post(argsPost);
            console.log(post);
            await post.save();
            pubsub.publish(process.env.NEW_POST, {newPost: argsPost});
            return post;
        }
    },
    Subscription:{
        newPost:{
            subscribe: (_,__,{pubsub}) => pubsub.asyncIterator([process.env.NEW_POST])
        }
    }
};

module.exports = resolvers;