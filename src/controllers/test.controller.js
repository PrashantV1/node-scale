const { fileService } = require('../service');


const downloadFile=async(req,res)=>{
    // const userId = req.authInfo.userId;
    const { fileName } = req.params;
    res.setHeader('content-disposition', `attachment; filename=${fileName}`);
    await fileService.downloadWebinarFile(fileName, res);
}


module.exports = {
    downloadFile
}
