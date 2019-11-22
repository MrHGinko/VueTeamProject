const express = require("express");
const User = require("../model/User");
const UserInfo = require("../model/UserInfo");
const router = new express.Router();

// 注册
router.post("/regiester", (req, res) => {
        const { tel, password } = req.body;
        User.add(tel, password)
                .then(userInfo => {
			UserInfo.add(tel, tel)
			.then(()=>{
				res.json({
					code: 0,
					message: "ok"
				});
			})
                })
                .catch(error => {
                        res.json({
                                code: -1,
                                message: error.message
                        });
                });
});

// 登录
router.post("/login", (req, res) => {
	const { tel, password } = req.body;
        //密码登录
        User.findByTelAndPsd(tel, password)
                .then(result => {
                        if (result) {
                                req.session.userInfo = result;
                                res.json({
                                        code: 0,
                                        message: "登录成功"
                                });
                        } else {
                                res.json({
                                        code: -1,
                                        message: "该账号或密码不正确"
                                });
                        }
                })
                .catch(error => {
                        res.json({ code: -2, message: error.message });
                })
            });


// 检查登录是否过期
router.get("/check_login", (req, res) => {
    if (req.session.userInfo && req.session.userInfo.tel) {
        res.json({
            code: 0,
            message: "ok"
        });
    } else {
        res.json({
            code: -1,
            message: "请重新登录"
        });
    }
});

//退出登录
router.get("/logout", (req, res) => {
    delete req.session.userInfo;
    res.json({
        code: 0,
        message: "ok"
    });
});

module.exports = router;