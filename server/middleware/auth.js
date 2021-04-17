module.exports= options =>{
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../modules/AdminUser')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        //需要jwt woken
        assert(token, 401, '非法操作,请先登录')
        const { id } = jwt.verify(token, req.app.get('secret'))
        //无效的jwt woken
        assert(id, 401, '非法操作,请先登录')
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '非法操作,请先登录')
        await next()
        //判断资源是谁的中间件
    }
}