const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const appUserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
      trim: true,
    },
});



// add plugin that converts mongoose to json
appUserSchema.plugin(toJSON);
appUserSchema.plugin(paginate);

appUserSchema.statics.userExists = async function (phoneNo) {
  const appuser = await this.findOne({ phoneNo });
  return !!appuser;
};

/**
 * @typedef Appuser
 */
const Appuser = mongoose.model('Appuser', appUserSchema);

module.exports = Appuser;
