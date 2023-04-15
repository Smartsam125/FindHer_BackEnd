
const {ApolloServer,gql} =require("apollo-server-express")
const express =require('express');
const mongoose =require('mongoose')
//onst { nonExecutableDefinitionMessage } = require("graphql/validation/rules/executabledefinitions");
//require('dotenv').config();
//const db=require('./db');
const models = require("./models");

const port = process.env.PORT || 4000
// let notes =[
//     {id:1,content:"This is a note",author:"Smart sam"},
//     {id:2,content:"This is another note",author:"Jjumba eric benjmin"},
//     {id:3,content:"Ok hey,this another note",author:"Jovita"},

// ];
const typeDefs =require("./Schema.js")

const resolvers = require("./resolvers")

const app=express()
//db.connect(process.env.DB_HOST)
main().catch((err)=>{
    console.log(err);
})
async function main(){
  await mongoose.connect('mongodb://localhost:27017/notedly')
}

const server=new ApolloServer({typeDefs,resolvers,
    context:()=>{
        return {models}
    } })
server.applyMiddleware({app,path:'/api'})
app.listen({port},()=>{
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    );
})
