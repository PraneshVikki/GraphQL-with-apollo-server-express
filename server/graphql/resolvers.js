const { get } = require('mongoose');
const Post = require('./modules/posts');
const { subscribe } = require('graphql');
const dotenv = require('dotenv');   
const Animal = require('./modules/Animal');
const User = require('./modules/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();
const genterateToken = require('../component/generateToken');
const auth = require('../middleware/auth');
const Author = require('./modules/Author');


//const pubsub = new PubSub();
let showValidationError = true;
const resolvers = {
    Animal:{
        __resolveType(animal,context,info){
            if(animal.breed){
                return "Dog";
            }
            if(animal.color){
                
                return "Cat";
            }
            
            return null;
        }
    },
    Query :{
        getPosts: async () => {
            return await Post.find({});
        },
        getAnimals: async () => {
            const a =  await Animal.find({});
            console.log(a);

            return a;},
        getDogs: async () => {
            const ani =  await Animal.find({});
            return ani.filter(animal => !!animal.species);
        },
        getCats: async () => {
            const ani =  await Animal.find({});
            return ani.filter(animal => !!animal.color);
        },  
        isUser: async (_, args,context) => {
            const user = await auth(context.req, context.res);
            console.log(user);
            if(user){
                return true;
            }
            return false;
        },
        getPostDetails: async (_, args) => {
            const post = await Post.find({id: args.id});
            return post[0];
        },
        getAllPostDetails: async()=>{
            return Post.find({})
        },
        getUsers: async()=>{
            return User.find({})
        }

    },
    PostDetails:{
        author: async (parent,args,context) => {            
            const a =  [await context.authorLoader.load(parent.id)];
            return a;
        }
    },


    

    Mutation :{
        createPost: async (_, args,{pubsub}) => {
            const argsPost = {
                id: args.postInput.id,
                title: args.postInput.title,
                content: args.postInput.content,
                author_id: args.postInput.author_id
            }
            
            const post = new Post(argsPost);
            await post.save();
            pubsub.publish(process.env.NEW_POST, {newPost: argsPost});
            return post;
        },
        createAuthor: async (_, args) => {
            const argsAuthor = {
                id: args.AuthorInput.id,
                name: args.AuthorInput.name
            }
            const author = new Author(argsAuthor);
            await author.save();
            return author;
        },

        createAnimal: async (_, args) => {
            const argsAnimal = {
                id: args.animalInput.id,
                name: args.animalInput.name,
                species: args.animalInput.species,
                breed: args.animalInput.breed,
                color: args.animalInput.color
            }
            const animal = new Animal(argsAnimal);
            await animal.save();
            console.log(animal);
            return animal;
        },
        getError: async (_, args) => {
            let error = {};
            if(showValidationError){
                error = {field: 'name', message: 'Name is required'};
            }
            else{
                error = {message: 'Timeout error' , timeLimit: 1000};
            }
            showValidationError = !showValidationError;
            console.log(error);
            return error;
        },
        signup:async (_, args,{ req , res}) => {
                const bcryptPassword = await bcrypt.hash(args.SignupInput.password, 12);
                const token = genterateToken(args.SignupInput.email, args.SignupInput.id, {req, res});
                const storeSignup = new User({id: args.SignupInput.id, name: args.SignupInput.name, email: args.SignupInput.email, password: bcryptPassword,token: token});
                storeSignup.save();

                return storeSignup;
            },
        signIn:async (_, args) => {
                const user = await User.findOne({email: args.SigninInput.email});
                if(user){
                    const isMatch = await bcrypt.compare(args.SigninInput.password, user.password);
                    if(isMatch){
                        args.SigninInput.token = user.token;
                    }
                }
            }
        
    },
    Error:{
        __resolveType(parent){
            if(parent.field){
                return "ValidationError";
            }
            if(parent.timeLimit){
                return "TimeoutError";
            }
            return null;
        }
    },
    Subscription:{
        newPost:{
            subscribe: (_,__,{pubsub}) => pubsub.asyncIterator([process.env.NEW_POST])
        }
    }
};

module.exports = resolvers;