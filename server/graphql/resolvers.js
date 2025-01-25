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
            const id = args.postInput.id;
            const title = args.postInput.title;
            const content = args.postInput.content;
            const post = new Post({id,title, content});
            await post.save();
            return post;
        }
    }
};

module.exports = resolvers;