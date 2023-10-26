const { Admin } = require('../models/index,js');
const ApiError = require('../utils/ApiError');
const { genRandom } = require('../utils/random');
const { generateAuthTokens } = require('./auth.service');
const { dbCache } = require('./cache.service');
const { createPassword,checkPassword } = require('./password.service');


const createAdmin = async (adminBody) => {
    if (await Admin.isEmailTaken(adminBody.email)) {
        throw new ApiError(400, 'Email already taken');
    }
        if (!adminBody.password.match(/\d/) || !adminBody.password.match(/[a-zA-Z]/)) {
            throw new ApiError(400,'Password must contain at least one letter and one number');
          }
          adminBody.salt=genRandom(adminBody.email.toUpperCase().substr(0, 3),adminBody.name.length);
    await createPassword({type:'admin',...adminBody})
    const admin = await Admin.create(adminBody);
    return admin;
  };

  const  update =async (id,body) => {
  const admin=  await Admin.updateOne({ _id: id }, { $set: {...body} });
  dbCache[`identity_${id}`]=false;
    return admin;
  };


  const login = async (data) => {
    const {email,password}=data;
     const checkAdminExists=  await Admin.isEmailTaken(email)
    if (!checkAdminExists) {
        throw new ApiError(401, 'Email not exists');
    }
    const validCreds=await checkPassword({password,salt:checkAdminExists.salt,type:"admin"})
    if(!validCreds)
    throw new ApiError(401, 'Invalid Login Details');
    const token= await generateAuthTokens(checkAdminExists,'admin');
    return {sucess:true,token};
  };

  module.exports = {
    createAdmin,login,update
  };
  

  