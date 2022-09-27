/* express的服务器 */
import useRoutes from './router/index.js'
//1. 导入express
import express from 'express'

//2. 创建express服务器
var app = express()

app.use('/docs', express.static('swagger')); // 配置swagger文档
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

useRoutes(app) // 导入路由

// const Router = require('./router') // 引入分模块管理的路由
const Router = express.Router() // 实例化一个路由对象

// 路由分模块
app.use(Router)

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method === "OPTIONS") res.send(200) // 预检请求快速返回
    else next();
});

//3. 访问服务器(get或者post) router/index.js
//4. 绑定端口
app.listen(8889)
console.log('启动8889端口')
