const bycrpyt =require("bcrypt")
const jwt = require("jsonwebtoken")
const {  AuthenticationError,ForbiddenError}= require("apollo-server-express")
const gravata = require('../util/')

module.exports={
    newNote:async (parent,args,{models})=>{
        return await models.Note.create({
          content:args.content,
          author:'smartsam'  
        })
        
        

    },
    deleteNote:async(parent,{id},{models}) =>{
        try {
             await models.Note.findOneAndRemove({_id:id})
             return true
            
        } catch (error) {
            return false
            
        }
        
    },
    updateNote:async (parent,{content,id},{models})=>{
        return models.Note.findOneAndUpdate({
            _id:id
        },{
            $set:{
                content
            },
            
        },{
            new:true
        })
    }

}