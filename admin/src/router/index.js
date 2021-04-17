import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
//新闻资讯编辑组件
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
//物品编辑组件
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
//英雄编辑组件
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
//文章编辑组件
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
//广告位编辑组件
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
//管理员编辑组件
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', name: 'login', component: Login, meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      //新闻资讯编辑
      {
        path: '/categories/create', component: CategoryEdit
      },
      {
        path: '/categories/list', component: CategoryList
      },
      {
        path: '/categories/edit/:id', component: CategoryEdit, props: true
      },
      //物品编辑
      {
        path: '/items/create', component: ItemEdit
      },
      {
        path: '/items/list', component: ItemList
      },
      {
        path: '/items/edit/:id', component: ItemEdit, props: true
      },
      //英雄编辑
      {
        path: '/heroes/create', component: HeroEdit
      },
      {
        path: '/heroes/list', component: HeroList
      },
      {
        path: '/heroes/edit/:id', component: HeroEdit, props: true
      },
      //文章编辑
      {
        path: '/articles/create', component: ArticleEdit
      },
      {
        path: '/articles/list', component: ArticleList
      },
      {
        path: '/articles/edit/:id', component: ArticleEdit, props: true
      },
      //广告位编辑
      {
        path: '/ads/create', component: AdEdit
      },
      {
        path: '/ads/list', component: AdList
      },
      {
        path: '/ads/edit/:id', component: AdEdit, props: true
      },
      //管理员位编辑
      {
        path: '/admin_users/create', component: AdminUserEdit
      },
      {
        path: '/admin_users/list', component: AdminUserList
      },
      {
        path: '/admin_users/edit/:id', component: AdminUserEdit, props: true
      },
    ]
  },
]


const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router
