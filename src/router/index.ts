import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/pages/Home.vue')
  },
  {
    path: '/year',
    name: 'YearList',
    component: () => import(/* webpackChunkName: "Home" */ '@/pages/year/List.vue')
  },
  {
    path: '/month',
    name: 'Month',
    component: () => import(/* webpackChunkName: "Home" */ '@/pages/month/List.vue')
  },
  {
    path: '/week',
    name: 'Week',
    component: () => import(/* webpackChunkName: "Home" */ '@/pages/week/List.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "Home" */ '@/pages/user/Index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/pages/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '@/pages/Register.vue')
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import(/* webpackChunkName: "Welcome" */ '@/pages/Welcome.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
