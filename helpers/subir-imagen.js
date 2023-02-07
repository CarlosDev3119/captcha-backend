
const antiCaptcha = require("@antiadmin/anticaptchaofficial");
antiCaptcha.setAPIKey(process.env.APIKEY);

const solveImage = async (captcha) => {
    try{
        return await antiCaptcha.solveImage(captcha, true)
    }catch(error){
        return res.status(400).json({msg: 'test received error '+error});
    }
}


module.exports = {
    solveImage,
    
}