const UserModel = require('./models/UserModel');
const BlacklistModel = require('./models/BlacklistModel');

// function to check exist of username on DB

function checkUsername(req, res, next){
    UserModel.findOne({
        username: req.body.username
    }).then(data=>{
        if( data ){
            res.json('This username has already existed')
        }else{
            next()
        }
    }).catch(err=>{
        res.json(err)
    })
}

function checkBlacklist(req, res, next){
   
    BlacklistModel.findOne({
        token : req.cookies.user
    })
    .then(data =>{
       if(data){
           res.json('Hết hạn đăng nhập')
       }else{
          next()
       }
    }).catch(err =>{
        res.json(err)
    })
}

module.exports = {checkBlacklist, checkUsername}