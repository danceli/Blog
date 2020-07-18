import Vue from 'vue'
import VueRouter from 'vue-router'
import Algorithm  from '../views/algorithm.vue'
import NetWork from '../views/network.vue'
import Talk from '../views/sui-bi-za-tan.vue'
import Linux from '../views/linux.vue'
import About from '../views/about.vue'
import Photography from '../views/photography.vue'
import Index from '../views/index.vue'
import Article from '../views/article.vue'
import Login from '../views/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    meta:{requestAuth:false},
    component: Index
  },
  {
    path: '/algorithm',
    name: 'algorithm',
    meta:{requestAuth:false},
    component: Algorithm
  },
  {
    path: '/network',
    name: 'network',
    meta:{requestAuth:false},
    component: NetWork
  },
  {
    path: '/talk',
    name: 'talk',
    meta:{requestAuth:false},
    component: Talk
  },
  {
    path: '/linux',
    name: 'linux',
    meta:{requestAuth:false},
    component: Linux,
    // children:[
    //   {path:'/article:id',component:Article,name:'artiicle'}
    // ]
  },
  {
    path: '/photography',
    name: 'photography',
    meta:{requestAuth:false},
    component: Photography
  },
  {
    path: '/about',
    name: 'about',
    meta:{requestAuth:false},
    component: About
  },
  {
    path:'/article/:id',
    name:'article',
    meta:{requestAuth:false},
    component:Article
  },

  //后台管理的路由
  {
    path:'/login',
    name:'login',
    meta:{requestAuth:false},
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.adminToken ? true : false;
  if(to.meta.requestAuth===false){
    next();
  }else{
    isLogin ? next() : next({path:'/login'});
  }
})
export default router
