/* express的服务器 */
//1. 导入express
import express from 'express'
import DB from './utils/mongoDBConfig.js'

//2. 创建express服务器
var app = express()

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://43.143.12.132");
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method === "OPTIONS") res.send(200) // 预检请求快速返回
    else next();
});

app.use('/docs', express.static('swagger')); // 配置swagger文档
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

import useRoutes from './router/index.js' // 引入分模块管理的路由
useRoutes(app) // 导入路由

const Router = express.Router() // 实例化一个路由对象
app.use(Router)

//4. 绑定端口
app.listen(8889)
console.log('启动8889端口')
