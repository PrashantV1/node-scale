const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const schedulerSchema = mongoose.Schema(
  {
    jobName: {
      type: String,
    },
    output:{
        type:Object,
    },
    previousRun:{
        type:Date
    },
    nextRun:{
        type:Date
    },
    status:{
        type:String
    }

});



schedulerSchema.plugin(toJSON);
schedulerSchema.plugin(paginate);




const scheduler = mongoose.model('scheduler', schedulerSchema);

module.exports = scheduler;
