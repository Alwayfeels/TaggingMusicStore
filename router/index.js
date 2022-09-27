import point from './point.js'

const router = (app) => {
    app.use("/point", point)
}

export default router