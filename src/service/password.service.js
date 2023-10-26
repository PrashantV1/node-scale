const { Password } = require('../models/index,js');
const { encrypt512 } = require('../utils/sha');


const createPassword = async (data) => {
    const body={
        type:data.type,
        salt:data.salt
    }
    body.password = encrypt512(data.password,body.salt)
    await Password.create(body)
  };
  const checkPassword = async (data) => {
    const {password,salt,type}=data;
    const inputHash=encrypt512(password,salt);
    const savedPassword= await Password.findOne({type,salt})
    const validCreds= inputHash ===savedPassword.password;
    if(!validCreds)
    return false;
    return true;
  };


  module.exports = {
    createPassword,checkPassword
  };
  

  