
const {ApolloServer,gql} =require("apollo-server-express")
const express =require('express');
const mongoose =require('mongoose')
const jwt =require("jsonwebtoken")
//onst { nonExecutableDefinitionMessage } = require("graphql/validation/rules/executabledefinitions");
//require('dotenv').config();
//const db=require('./db');
const models = require("./models");

const port = process.env.PORT || 4000

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
const getUser=token=>{
     if(token){
         try {
           return jwt.verify(token,process.env.JWT_SECRET)  
            
         } catch (error) {
             throw new Error("invalid session")
            
         }

     }
}

const server=new ApolloServer({typeDefs,resolvers,
    context:({req})=>{
        const token =req.headers.authorization
       const user =getUser(token)
        console.log(user);
        return {models,user}
    } })
server.applyMiddleware({app,path:'/api'})
app.listen({port},()=>{
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    );
})
