const Cache = require("../models/cache.model");

const dbCache={};

async function cache(key,val,exp){
const time=new Date();
time.setSeconds(time.getSeconds()+exp)
await Cache.create({key,data:val,expire:time});
dbCache[key]=val;
}


async function LoadCache(){
    const data=await Cache.find({});
    data.forEach((cacheData)=>{
        dbCache[cacheData.key]=cacheData.data;
    })
}



module.exports={
    dbCache,cache,LoadCache
}