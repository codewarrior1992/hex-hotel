import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/HomePage.vue';
import { getUserStorage, isLoggedFun, openUserModal } from '@/assets/js/functions.js';
Vue.use(VueRouter)

// Avoided redundant navigation to current location.
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// Routes
const routes = [
  {
    path:'*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/room/:id',
    name: 'room',
    component: () => import('../views/RoomPage.vue')
  },
  {
    path: '/reserve',
    component: () => import('../views/ReservePage.vue'),
    children:[
      {
        path:'',
        name:'reserve',
        component : () => import('../components/BookInfo.vue'),
        props : (route) => route.params,
        meta: { requiresAuth: true },
      },
      {
        path:'payment', 
        name:'payment',
        component : () => import('../components/BookPayment.vue'),
        props : (route) => route.params,
      },
      {
        path:'done',
        name:'done',
        component : () => import('../components/BookDone.vue'),
        props : (route) => route.params,
      },
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/AdminPage.vue'),
    children:[
      {
        path:'',
        component : () => import('../components/AdminOrder.vue'),
        meta: { requiresAuth: true },
      },
    ]
  }
]

// Config
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Guard
router.beforeEach(async(to,from,next) => { 
  const auth = to.meta.requiresAuth;

  if(auth){

    if(to.path === '/reserve') return router.push({ name : 'home'})

    const user = getUserStorage();
    if(user == null) {
      openUserModal()
      return router.push({ name : 'home'})
    }

    const isLogin = await isLoggedFun(user.refresh_token)
    if(!isLogin) {
      openUserModal()
      return router.push({ name : 'home'})
    }
    
    next()
  } else {
      next()
  }
})

export default router
