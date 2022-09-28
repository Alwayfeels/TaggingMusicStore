import express from 'express'
import DB from '../utils/mongoDBConfig.js'

const router = express.Router()

// get请求
router.get('/', function (req, res) {
    const ip = getClientIp(req)
    DB.insertVisitedPoint({ ip, time: new Date().getTime() })
    res.send(RES_CONFIG.success(`get succss, ${ip}`))
})

// post请求
router.post('/', function (req, res) {
    const ip = getClientIp(req)
    DB.insertVisitedPoint({ ip, time: new Date().getTime(), post: true })
    res.send(RES_CONFIG.success('post success'))
})

// ====================================================
const RES_CONFIG = {
    success: (data = null, message = 'success', code = 200) => {
        return { code, data, message }
    }
}
// 获取访问者IP
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

export default router