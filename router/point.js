import express from 'express'
import { insertVisitedPoint } from '../utils/mongoDBConfig.js'

const router = express.Router()

//3.1 get请求
router.get('/', function (req, res) {
    const ip = getClientIp(req)
    insertVisitedPoint({ ip, time: new Date().getTime() })
    res.send(`get请求成功, ${ip}`)
})

//3.2 post请求
router.post('/', function (req, res) {
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

export default router