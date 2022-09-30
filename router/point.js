import express from 'express'
import DB from '../utils/mongoDBConfig.js'

const router = express.Router()

// get请求
router.get('/welcome', function (req, res) {
    const ip = getClientIp(req)
    DB.insertWelcome({ ip, date: new Date().getTime() })
    res.send(RES_CONFIG.success(`welcome!`))
})

// post请求
router.post('/', function (req, res) {
    const ip = getClientIp(req)
    const data = req.body
    DB.insertVisitedPoint({ ip, date: new Date().getTime(), post: true, ...data })
    res.send(RES_CONFIG.success('post success'))
})

/**
 * @desc: 上传Tag
 */
router.post('/postTaggedSong', function (req, res) {
    const data = req.body
    const needProps = ['taggedSongs', 'userId', 'profile'];
    if (!validateProps(res, data, needProps)) return false;
    DB.insertTaggedSongs(data)
    res.send(RES_CONFIG.success('upload success.'))
})
// ====================================================
const RES_CONFIG = {
    success: (data = null, message = 'success', code = 200) => {
        return { code, data, message }
    },
}
// 获取访问者IP
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

function validateProps(res, data = {}, props) {
    let valid = true;
    props.forEach(prop => {
        if (!data.hasOwnProperty(prop)) {
            res.send({ data: null, message: `${prop} 不能为空！`, code: 400 })
            valid = false;
        }
    })
    return valid
}
// ====================================================

export default router
