const express = require("express");
const mongoose = require("mongoose");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

const server = express();

var store = new MongoDBStore({
    uri: "mongodb://localhost:27017/db",
    collection: "session"
});

// Catch errors
store.on("error", function(error) {
    console.log(error);
});

server.use(
        require("express-session")({
                secret: "hello world",
                name: "login_session",
                cookie: {
                        maxAge: 1000 * 60 * 60 * 24  // 1 Day
                },
                store: store,
                resave: true,
                saveUninitialized: true
        })
);

server.use(express.urlencoded({ urlencoded: false }));
server.use(express.json());

server.use("/api/user", require("./routers/userRouter"));
server.use("/api/movie", require("./routers/movieRouter"));

// 以上 添加数据请求

server.use((req, res, next) => {
    if (req.session.userInfo && req.session.userInfo._id) {
        //登录了
        next();
    } else {
        res.json({
            code: -1,
            message: "请先登录"
        });
    }
});

server.use("/api/userinfo", require("./routers/infoRouter"));
server.use("/api/order", require("./routers/orderRouter"));

// 连接数据库
mongoose.connect(
    "mongodb://localhost:27017/db", { useNewUrlParser: true },
    error => {
        if (error) {
            console.log("连接数据库失败：");
            console.log(error);
        } else {
            console.log("连接数据成功");
            // 启动成功
            server.listen("3300", error => {
                if (!error) {
                    console.log("服务器启动成功: http://localhost:3300");
                } else {
                    console.log("服务器启动失败：");
                    console.log(error);
                }
            });
        }
    }
);