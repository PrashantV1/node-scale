const { Appuser } = require("../../models/index,js");



 function getUserCount() {
    const userDoc = Appuser.find({});
  return  Promise.resolve(userDoc).then((data) => {
        const time = new Date();
        return {
            sucess:data
        }
    }).catch((err)=>{
        throw new Error(err);
    })
}



module.exports.getUserCount=getUserCount;