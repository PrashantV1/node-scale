const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test'),
    PORT: Joi.number().default(3000),
    REDIS_HOST: Joi.string().default('127.0.0.1'),
    REDIS_PORT: Joi.string().default('6379'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt:{
    appuser:'APPUSER123',
    admin:'Admin123',
    accessTokenExpires:10,
    refreshTokenExpires:30
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
  },
  tokens:{
    REFRESH:'REFRESH',
    RESET_PASSWORD:'RESET_PASSWORD',
    VERIFY_EMAIL:'VERIFY_EMAIL'
  },
  userTypes:{
    ADMIN:'ADMIN',
    APPUSER:'APPUSER'
  }
  
};
