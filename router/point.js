import express from 'express'
import DB from '../utils/mongoDBConfig.js'

const router = express.Router()

// get请求
router.get('/welcome', function (req, res) {
    const ip = getClientIp(req)
    DB.insertWelcome({ ip, date: new Date().format() })
    res.send(RES_CONFIG.success(`welcome!`))
})

// post请求
router.post('/', function (req, res) {
    const ip = getClientIp(req)
    const data = req.body
    DB.insertVisitedPoint({ ip, date: new Date().format(), post: true, ...data })
    res.send(RES_CONFIG.success('post success'))
})

/**
 * @desc: 上传Tag
 */
router.post('/postTaggedSongs', function (req, res) {
    const data = req.body
    const needProps = ['taggedSongs', 'userId', 'profile'];
    if (!validateProps(res, data, needProps)) return false;
    DB.insertTaggedSongs(data, 'taggedSongs')
    res.send(RES_CONFIG.success('upload success.'))
})

/**
 * @desc: 下载Tag
 */
router.get('/getTaggedSongs', async function (req, res) {
    const { userId } = req.query
    if (!userId) {
        res.send({ code: 400, message: 'userId is required', data: null })
        return false;
    }
    const data = await DB.searchTaggedSongs(userId)
    res.send({ code: 200, message: 'success', data })
})

/**
 * @desc: 同步 tag, 上传本地 Tag，返回最新的合并后 tag
 */
router.post('/syncTags', async function (req, res) {
    const data = req.body
    const needProps = ['taggedSongs', 'userId', 'profile'];
    if (!validateProps(res, data, needProps)) return false;

    DB.insertTaggedSongs(data, 'taggedSongs')

    const resData = await DB.searchTaggedSongs(data.userId)
    res.send({ code: 200, message: 'success', data: resData })
})

/**
 * @desc: 获取首页预览数据 previewTaggedSong;
 */
router.get('/getPreviewData', async function (req, res) {
    const myID = 83245422
    const data = await DB.searchTaggedSongs(myID)
    res.send({ code: 200, message: 'success', data: data.taggedSongs })
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

Date.prototype.format = function (fmt = 'yyyy-MM-dd hh:mm:ss') {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
// ====================================================

export default router
