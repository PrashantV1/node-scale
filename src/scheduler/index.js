// const { Scheduler } = require("../models/index,js");



// // const loadDatatoScheduler = async () => {

// //     const schedulerData = await Scheduler.findOne({});
// //     schedulerData.forEach((data) => {

// //     })


// // }


// const ss = (fn, interval) => {
//     setInterval(() => fn(), interval);
// }


function setJobExecution(key,fn,frequency,duration,interval){
if(duration=='Minute'){
    interval*=60*1000;
}else if(duration=='Seconds'){
    interval*=1000;
};
console.log(fn)
if(frequency=='Every'){
    setInterval(()=>{
   Promise.resolve(fn()).then(()=>console.log('Job Rune Successfully',key)).catch((err)=>console.log('error',key,err))
},interval
    );
}
}



module.exports.setJobExecution=setJobExecution