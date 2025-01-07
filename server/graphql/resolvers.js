const { get } = require('mongoose');
const Post = require('./modules/posts');

const resolvers = {
    Query :{
        getPosts: async () => {
            return await Post.find({});
        }
    },
    Mutation :{
        createPost: async (_, args) => {
            const {title, content} = args;
            const post = new Post({title, content});
            await post.save();
            return post;
        }
    }
};

module.exports = resolvers;