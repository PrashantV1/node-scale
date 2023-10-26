const { Admin } = require("../../models/index,js");



 function getAdminCount() {
    const userDoc = Admin.find({});
  return  Promise.resolve(userDoc).then((data) => {
        const time = new Date();
        return {
            sucess:data
        }
    }).catch((err)=>{
        throw new Error(err);
    })
}



module.exports.getAdminCount=getAdminCount;