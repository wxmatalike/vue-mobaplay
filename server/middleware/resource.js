module.exports = options=>{
    return async (req, res, next) => {
        //用于转换大小写
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../modules/${modelName}`)
        next()
    }
}