const  Appuser  = require('../models/appuser.model');
const ApiError = require('../utils/ApiError');
const axios = require('axios');
const logger = require('../config/logger');

const idamOtpBaseUrl=`https://www.jio.com/JioWebService/rest/idamService`


const createAppUser = async (userBody) => {
    if (await Appuser.userExists(userBody.phoneNo)) {
      throw new Error('User Exists');
    }
    const User = await Appuser.create(userBody);
    console.log("userrr",User)
    return User;
  };

  const getOtp = async (mobileNo) => {
    const o = {
      url: `${idamOtpBaseUrl}/sendOtp`,
      method: 'post',
      data: {
        mobileNo,
      },
      timeout: 10000,
    };
    try {
      const response = await axios(o);
      // todo: fixthis
      if (response.data && response.data.responseCode && response.data.responseCode !== '204') {
        throw new ApiError(400, 'Failed to send OTP');
      }
      return { success: true };
    } catch (err) {
      logger.error(err);
      if (axios.isAxiosError(err)) {
        // TODO anndle error
        console.log("insideeeeee")

        const { data } = err.response;
  
        if (data.errorMessage === 'SEND_OTP_LOCKED_MSG')
          throw new ApiError(400, `Please try again after some time`);
      }
      throw err;
    }
  };


  module.exports = {
    createAppUser,getOtp
  };
  