const UserModel = require('./models/UserModel')
const BlacklistModel = require('./models/BlacklistModel');
const jwt = require('jsonwebtoken');


function checkCookie(req, res, next){

     let userId = jwt.verify( req.cookies.user, 'vulong').token
    UserModel.findOne({
        _id: userId
    }).then(data=>{
        if(data){
            next()
        }else{
            res.json('Chua co cookie')
        }
    }).catch(err=>{
        res.json(err)
    })
}

function checkAdminRole(req, res, next){
    let userId = jwt.verify( req.cookies.user, 'vulong').token
    UserModel.findOne({
        _id: userId
    }).then(data =>{
        if(data){
            req.role = data.role;
            next()
        }
    }).catch(err =>{
        res.json(err)
    })
}



module.exports = {checkCookie, checkAdminRole}