const { get } = require('mongoose');
const Post = require('./modules/posts');
const { subscribe } = require('graphql');
const dotenv = require('dotenv');   
const Animal = require('./modules/Animal');
dotenv.config();

//const pubsub = new PubSub();
const resolvers = {
    Animal:{
        __resolveType(animal,context,info){
            if(animal.breed){
                console.log('Dog');
                return "Dog";
            }
            if(animal.color){
                console.log('Cat');
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
        },
        createAnimal: async (_, args) => {
            console.log(args.animalInput.name);
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
        }
    },
    Subscription:{
        newPost:{
            subscribe: (_,__,{pubsub}) => pubsub.asyncIterator([process.env.NEW_POST])
        }
    }
};

module.exports = resolvers;