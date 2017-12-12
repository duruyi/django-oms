import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      icon: 'dashboard',
      meta: { noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    name: 'userManager',
    path: '/users',
    component: Layout,
    icon: 'user',
    redirect: 'users',
    authority: 'userManager',
    children: [
      { path: 'users', component: _import('users/users'), name: 'userlist', authority: 'userlist' },
      { path: 'usergroups', component: _import('users/usergroups'), name: 'grouplist', authority: 'grouplist' },
      { path: 'roles', component: _import('users/roles'), name: 'rolelist', authority: 'rolelist' }
    ]
  },
  {
    name: 'ticketManager',
    path: '/worktickets',
    component: Layout,
    icon: 'leaf',
    redirect: 'workticket',
    authority: 'ticketManager',
    children: [
      { path: 'workticket', component: _import('worktickets/workticket'), name: 'workticketlist', authority: 'workticketlist' },
      { path: 'tickettype', component: _import('worktickets/tickettype'), name: 'tickettypelist', authority: 'tickettypelist' },
      { path: 'addworkticket', hidden: true, component: _import('worktickets/addworkticket'), name: 'addworkticket', authority: 'addworkticket' },
      { path: 'editworkticket/:id', hidden: true, component: _import('worktickets/editworkticket'), name: 'editworkticket', authority: 'editworkticket' }
    ]
  },
  {
    name: 'toolManager',
    path: '/tools',
    component: Layout,
    icon: 'cogs',
    redirect: 'upload',
    authority: 'toolManager',
    children: [
      { path: 'upload', component: _import('tools/upload'), name: 'upload', authority: 'upload' },
      { path: 'test', component: _import('tools/test'), name: 'test', authority: 'test' }
    ]
  },
  {
    name: 'menuManager',
    path: '/menus',
    component: Layout,
    icon: 'fire',
    redirect: 'menus',
    authority: 'menuManager',
    children: [
      { path: 'menus', component: _import('menus/menus'), name: 'menulist', authority: 'menulist' },
      { path: 'menuperm', component: _import('menus/menuperm'), name: 'menuperm', authority: 'menuperm' }
    ]
  },
  {
    name: 'deployManager',
    path: '/deploys',
    component: Layout,
    icon: 'flag',
    redirect: 'noredirect',
    authority: 'deployManager',
    children: [
    ]
  }
]

export const errorRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
