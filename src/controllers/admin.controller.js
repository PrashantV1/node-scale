const {  adminService } = require('../service');
const { serviceHandler } = require('../utils/ServiceHandler');


const createAdmin=async(req,res)=>{
    const adminBody=req.body;
    const admin =  adminService.createAdmin(adminBody)
    serviceHandler(req,res,Promise.resolve(admin));
};

const loginAdmin=async(req,res)=>{getAdmin
    const admin =  adminService.login(req.body)
    serviceHandler(req,res,Promise.resolve(admin));
};
const getAdmin=async(req,res)=>{
    const admin =  req.user;
    res.send(admin)
};

const updateAdmin=async(req,res)=>{
    const adminId =  req.user._id;
    const admin =  adminService.update(adminId,req.body)
    serviceHandler(req,res,Promise.resolve(admin));
};

module.exports = {
    createAdmin,loginAdmin,getAdmin,updateAdmin
};
