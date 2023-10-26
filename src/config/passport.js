const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { dbCache, cache } = require('../service/cache.service');

const getCachedIdentity = async (Model, identityId) => {
  let identity = dbCache[`identity_${identityId}`];
  if (!identity) {
    identity = await Model.findById(identityId);
    if (!identity) {
      throw new Error('Identity not found');
    }
    cache(`identity_${identity._id}`, identity,24*30*3600);
  }
  return identity;
};

const jwtAdminOptions = {
  secretOrKey: 'jwtForEnergyDemand',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

const jwtAdminVerify =(strategy)=> async (req, payload, done) => {
  try {
    console.log("inssssssorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    if (payload.type !== 'ACCESS') {
      throw new Error('Invalid token type');
    }
    let model;
    if(strategy=='jwtAdmin')
    model=Admin;
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req); 
    const tokenIncache = dbCache[`ACCESSTOKEN_${payload.sub}`];
    if(tokenIncache!==token)
    throw new Error('Invalid Token');
   const admin = await getCachedIdentity(model, payload.sub);
    done(null, admin);
  } catch (error) {
    done(error, false);
  }
};


const jwtStrategyForAdmin =(strategy)=> new JwtStrategy(jwtAdminOptions, jwtAdminVerify(strategy));

module.exports = {
  jwtStrategyForAdmin,
};
