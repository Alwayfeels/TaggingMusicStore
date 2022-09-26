/* express的服务器 */
import { insertVisitedPoint } from './mongoDBConfig.js'
//1. 导入express
import fs from 'fs'
import http from 'http'
import express from 'express'

//2. 创建express服务器
var app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// const Router = require('./router') // 引入分模块管理的路由
const Router = express.Router() // 实例化一个路由对象

// 路由分模块
app.use(Router)

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//3. 访问服务器(get或者post)
//参数一: 请求根路径
//3.1 get请求
app.get('/store', function (req, res) {
    const ip = getClientIp(req)
    insertVisitedPoint({ ip, time: new Date().getTime() })
    res.send(`get请求成功, ${ip}`)
})

//3.2 post请求
app.post('/store', function (req, res) {
    const ip = getClientIp(req)
    insertVisitedPoint({ ip, time: new Date().getTime(), post: true })
    res.send(`post请求成功, ${ip}`)
})

// 获取访问者IP
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

//4. 绑定端口
app.listen(8889)
console.log('启动8889端口')
