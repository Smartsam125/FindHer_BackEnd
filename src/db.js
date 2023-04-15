const mongoose =require('mongoose')
module.exports={
    connect:DB_HOST => {
        mongoose.set('useNewUrlParser',true)
        mongoose.set('useFindAndModify',false)
        mongoose.set('useCreateIndex',true)
        mongoose.set('useUnifiedTopology',true)
        mongoose.connect(DB_HOST)
        main().catch(err => console.log(err))
        async function main(){
            await mongoose.connect(DB_HOST)
            process.exit();

        }
        
    },
    close:()=>{
        mongoose.disconnect()
    }
}
