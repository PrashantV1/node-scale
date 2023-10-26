const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    maxPlayer:{
        type:Number
    },
    joiningFees:{
        type:Number
    },
    prizeMoney:{
        type:Number
    },
    players:{
        type :Array
    },
    state:{
        type:String,
        enum:['NotStarted','Started','Ended']
    },
    active:{
        type:Boolean
    }
});



roomSchema.plugin(toJSON);
roomSchema.plugin(paginate);




const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
