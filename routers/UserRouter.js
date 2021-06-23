const express = require("express");
const UserRouter = express.Router();
const UserModel = require("../models/UserModel");
const BlacklistModel = require("../models/BlacklistModel");
const checkAu = require("../checkAuthentication");
const checkUser = require("../checkUsername");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;



UserRouter.get("/home", (req, res, next) => {
    UserModel.find({
        role: { $ne: "admin" },
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

//find Username and check exist
UserRouter.post("/findUsername", checkUser.checkUsername, (req, res, next) => {
    res.json("This username hasnt already existed");
});

UserRouter.post("/homepage",checkAu.checkCookie, checkAu.checkAdminRole, checkUser.checkBlacklist,
    (req, res, next) => {
        if (req.role === "admin") {
            res.json("Da dang nhap voi quyen admin");
        } else {
            res.json("Da dang nhap voi quyen user");
        }
    }
);

// Login page
UserRouter.post("/login", async (req, res, next) => {
    try {
        let data = await UserModel.findOne({username: req.body.username})
        let crypt = await bcrypt.compare(req.body.password, data.password) 
                // result == true
              if(crypt){
                    let token = jwt.sign({ token: data._id }, "vulong");
                    res.json({ token: token })
                }else{
                    res.json("Dang nhap that bai");
                }
    } catch (error) {
        res.json(error)
    }
    
});

// Dang ky
UserRouter.post("/register", (req, res, next) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            UserModel.create({
                username: req.body.username,
                password: hash,
            })
                .then((data) => {
                    if (data) {
                        res.json(data);
                    } else {
                        res.json(err);
                    }
                })
                .catch((err) => {
                    res.json(err);
                });
        });
    });
});

// change password

UserRouter.put("/changePassword", (req, res, next) => {
    UserModel.updateOne(
        {
            username: req.body.username,
            password: req.body.password,
        },
        {
            password: req.body.newPassword,
        }
    )
        .then((data) => {
            if (data.nModified !== 0) {
                res.json("Doi mat khau thanh cong");
            } else {
                res.json("Sai thong tin tai khoan");
            }
        })
        .catch((err) => res.json("Loi server"));
});

// delete user

UserRouter.delete("/deleteUser/:id", (req, res, next) => {
    UserModel.deleteOne({
        _id: req.params.id,
    })
        .then((data) => {
            if (data.deletedCount !== 0) {
                res.json("Xoa tai khoan thanh cong");
            } else {
                res.json("Khong co gi de xoa");
            }
        })
        .catch((err) => res.json("Server loi"));
});

// Log out

UserRouter.post("/logout", (req, res, next) => {
    BlacklistModel.create({
        token: req.cookies.user,
    })
        .then((data) => {
            res.json("Dang xuat thanh cong");
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = UserRouter;
