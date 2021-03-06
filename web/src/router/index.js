import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'
import Wx from '../views/Wx.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        name: "home",
        component: Home
      },
      {
        path: '/articles/:id',
        name: "article",
        component: Article,
        props:true
      },
      {
        path: '/wx',
        name: "wx",
        component: Wx,
      },
    ]
  },
  {
    path:'/heroes/:id',
    name:'hero',
    component:Hero,
    props:true
  }

]

const router = new VueRouter({
  routes,
  scrollBehavior(to,from,saveTop){
    if(saveTop){
      return saveTop;
    }else{
      return {x:0,y:0}
    }
  },
})

export default router
