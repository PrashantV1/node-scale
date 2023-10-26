const { userService } = require('../service');
const catchAsync = require('../utils/catchAsync');


const createUser=catchAsync(async(req,res)=>{
    const userBody=req.body;
    try{
    const user = await userService.createAppUser(userBody)
    res.send(user);
    }catch(err){
        res.send(err);
    }
});

const getOtp = catchAsync(async (req, res) => {
    const { phoneNo } = req.body;
    await userService.getOtp(req.body.phoneNo);
    res.send({ success: true });
  });
  
module.exports = {
    createUser,getOtp
};
