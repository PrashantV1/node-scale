const { setJobExecution } = require(".");
const { getAdminCount } = require("./jobs/getAdminuse");
const { getUserCount } = require("./jobs/getAppusercount");




const setJob=()=>{
    setJobExecution('UserCountData',getUserCount,'Every','Seconds',15)
    setJobExecution('AdminData',getAdminCount,'Every','Seconds',25)

    
}




// setJob()
module.exports.setJob=setJob;
