import point from './point.js'

const router = (app) => {
    app.use("/store", point) // 固定前缀
}

export default router