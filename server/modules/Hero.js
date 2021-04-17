const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    //英雄背景图片
    banner: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    //英雄操作的评分
    scores: {
        difficult: { type: Number },
        skill: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        delay: { type: String },
        cost: { type: String },
        description: { type: String },
    }],
    //顺丰逆风出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    //使用技巧
    usageTips: { type: String },
    //对线技巧
    battleTips: { type: String },
    //团战技巧
    teamTips: { type: String },
    //最佳英雄组合
    patners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }],
})
                                           //手动定义模型名称，否则有可能生成为heros
module.exports = mongoose.model('Hero', schema,'heroes')