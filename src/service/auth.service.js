const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const Token = require('../models/token.model');
const { cache } = require('./cache.service');


  const generateToken = (userId, expires, type, tokenFor) => {
    const secret = config.jwt[tokenFor]
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
      tokenFor,
    };
    return jwt.sign(payload, secret);
  };

  const saveToken = async (token, userId, expires, type, tokenFor, blacklisted = false) => {
    await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
      tokenFor,
    });
  };

  const generateAuthTokens = async(user, tokenFor) => {
    const accessTokenExpires = moment().add( config.jwt.accessTokenExpires, 'minutes');
    const accessToken = generateToken(user._id, accessTokenExpires, 'ACCESS', tokenFor);
    const refreshTokenExpires = moment().add( config.jwt.refreshTokenExpires, 'days');
    const refreshToken = generateToken(user._id, refreshTokenExpires, 'REFRESH', tokenFor);
    await saveToken(refreshToken, user._id, refreshTokenExpires, 'refresh', tokenFor, false);
    cache(`ACCESSTOKEN_${user._id}`,accessToken,config.jwt.accessTokenExpires*60);
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };


  module.exports = {
    generateAuthTokens,
  };
  