const jsonwebtoken = require('jsonwebtoken');


module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jsonwebtoken.verify(token , process.env.TOKEN_SECRET);

        if(req.body.userId && req.body.userId !== decodeToken.userId){
            return res.status(401).json({
                status: 401,
                message: 'Invalid User ID'
            })
        } else {
            next()
        }
    }

    catch(err){
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}