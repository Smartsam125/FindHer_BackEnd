
const {ApolloServer,gql} =require("apollo-server-express")
const express =require('express');
const mongoose =require('mongoose')
const jwt =require("jsonwebtoken")
const helmet =require("helmet")
const cors =require("cors")

//onst { nonExecutableDefinitionMessage } = require("graphql/validation/rules/executabledefinitions");
require('dotenv').config();
//const db=require('./db');
const models = require("./models");
mongoose.set('useNewUrlParser',true)
mongoose.set('useFindAndModify',false)
mongoose.set('useCreateIndex',true)
mongoose.set('useUnifiedTopology',true)

const port = process.env.PORT || 8080

const typeDefs =require("./Schema.js")

const resolvers = require("./resolvers")

const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const app=express()
//db.connect(process.env.DB_HOST)
app.use(helmet())
app.use(cors())

main().catch((err)=>{
    console.log(err);
})
async function main(){
  await mongoose.connect('mongodb+srv://smartsam:Student3samj@cluster0.txuv9rs.mongodb.net/?retryWrites=true&w=majority')
  //await mongoose.connect(process.env.DB_HOST)
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
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
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
