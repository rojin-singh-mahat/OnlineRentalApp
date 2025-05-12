const jwt = require("jsonwebtoken");
const Admin = require('../models/adminSchema');

const admimAuthentication = async (req , res , next) => {

    try {
        const token = req.cookies.jwtAdmin;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootAdmin = await Admin.findOne({_id: verifyToken._id, "tokens.token":token});

        if(!rootAdmin){ throw new Error('admin not found')}

        req.token = token;
        req.rootAdmin = rootAdmin;
        req.adminID = rootAdmin.id;

        next();

    } catch(error){
        res.status(401).send('Unautorized: no token provided')
        console.log(error);
    }
}
module.exports = admimAuthentication