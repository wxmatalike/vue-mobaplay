module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../modules/AdminUser')
    const router = express.Router({
        mergeParams: true
    })
    // const req.Model=require('../../modules/req.Model')
    //新建资源接口
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //获取全部资源
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    //获取资源的详情页
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //更改资源的详情信息
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除资源
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //登录校验中间件
    const authMiddleware = require('../../middleware/auth')

    //判断资源是谁的中间件
    const resourceMiddleware = require('../../middleware/resource')

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)


    //图片上传路由
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://www.mobaplay.xyz/uploads/${file.filename}`
        res.send(file)
    })

    //登录路由
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        //寻找用户名 校验密码 返回token
        //判断用户是否存在

        //因为模型model中设置了select为false，所以这里想要取出需要用到select+password
        const user = await AdminUser.findOne({ username }).select('+password')
        //使用http-assert可以代替使用if判断用户等信息存在情况
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        //判断密码是否正确
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        //返回token
        const token = await jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token,username })
    })

    //全局错误处理
    app.use(async (err, req, res, next) => {
        //有时候并没有错误码，不存在statuscode，在没有时添加500错误
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}

