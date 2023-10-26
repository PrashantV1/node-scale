const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const cacheSchema = mongoose.Schema(
  {
    key: {
      type: String,
    },
    data:{
        type:Object,
    },
    expire:{
        type:Date
    }
});



cacheSchema.plugin(toJSON);
cacheSchema.plugin(paginate);




const Cache = mongoose.model('cache', cacheSchema);

module.exports = Cache;
