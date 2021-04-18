const Ad = require('../../modules/Ad')

module.exports = app => {
    const router = require('express').Router()
    //因为已经将模型定义进mongoose,所以可以直接饮用mongoose来使用模型
    const mongoose = require('mongoose')
    mongoose.set('useFindAndModify', false)
    const Category = mongoose.model('Category')
    const Article = mongoose.model('Article')
    const Hero = mongoose.model('Hero')
    //用于导入新闻数据    测试的接口
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.find().where({ parent: parent }).lean()
        const newsLTitles = []
        const newsList = newsLTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })

    //新闻列表  用于前端调用
    router.get('/news/list', async (req, res) => {
        // const parent= await Category.findOne({
        //     name:'新闻分类'
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean()
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.aggregate([
            //通过match过滤数据
            { $match: { parent: parent._id } },
            //进行aggregate关联查询
            {
                $lookup: {
                    //模型名字默认为名字的小写复数形式 即Article >>> articles
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                //通过修改addfields来限制拿到的数据数量
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }

        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })


        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })

    //导入英雄数据  测试接口 导入爬下来的数据
    router.get('/heroes/init', async (req, res) => {
        await Hero.deleteMany({})
        const rawData = []
        for (let cat of rawData) {  //如果使用in进行循环需要前面为k，而非cat
            if (cat.name === '热门') {
                continue
            }
            //找到当前分类在数据库中对应的数据
            const category = await Category.findOne({
                name: cat.name
            })
            cat.heroes = cat.heroes.map(hero => {
                hero.categories = [category]
                return hero
            })
            //上传英雄数据
            await Hero.insertMany(cat.heroes)
        }
        res.send(await Hero.find())
    })

    //英雄列表  用于前端调用
    router.get('/heroes/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '英雄分类'
        })
        //聚合查询，速度很快
        const cats = await Category.aggregate([
            //通过match过滤数据
            { $match: { parent: parent._id } },
            //进行aggregate关联查询
            {
                $lookup: {
                    //模型名字默认为名字的小写复数形式 即Article >>> articles
                    from: 'heroes',
                    localField: '_id',
                    foreignField: 'categories',
                    //as必须存在，是自己起的名字
                    as: 'heroList'
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                categories: { $in: subCats }
            }).limit(10).lean()
        })
        res.send(cats)
    })

    router.get('/ads/list',async(req,res)=>{
        const data=await Ad.find()
        res.send(data)
    })

    //文章详情页展示
    router.get('/articles/:id', async (req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories: { $in: data.categories }
        }).limit(2)
        res.send(data)
    })

    //英雄详情页展示
    router.get('/heroes/:id', async(req,res)=>{
        const data= await Hero.findById(req.params.id)
                            .populate('categories items1 items2 patners.hero').lean()
        res.send(data)
    })

    app.use('/web/api', router)
}