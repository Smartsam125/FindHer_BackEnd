module.exports={
    notes:async (parent,args,{models})=>{
        return await models.Note.find({author:user._id}).sort({ _id: -1})
    },
    favorites:async (parent,args,{models})=>{
        return await models.Note.find({favoritedBy:user._id}).sort({ _id: -1})
    }

}