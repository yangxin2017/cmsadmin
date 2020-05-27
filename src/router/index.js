import Vue from 'vue'
import Router from 'vue-router'

import { getAllCategorys } from '@/api/cms'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

let menujson = []

export const constantRoutes = [
]

constantRoutes.push({
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
})
constantRoutes.push({
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
})
// constantRoutes.push({
//   path: '/',
//   component: Layout,
//   redirect: '/dashboard',
//   children: [{
//     path: 'dashboard',
//     name: 'Dashboard',
//     component: () => import('@/views/dashboard/index'),
//     meta: { title: 'Dashboard', icon: 'dashboard' }
//   }]
// })

//add other
// constantRoutes.push({
//   path: '/content',
//   component: Layout,
//   redirect: '/content/list',
//   name: '内容管理',
//   hidden: false,
//   meta: { title: '内容管理', icon: 'example' },
//   children: [
//     {
//       path: 'list/:pcode/:code',
//       name: '内容列表',
//       component: () => import('@/views/admin/content/list/index'),
//       meta: { title: '内容管理', icon: 'table' },
//       hidden: true
//     },
//     {
//       path: 'list/:pcode',
//       name: '内容列表',
//       component: () => import('@/views/admin/content/list/index'),
//       meta: { title: '内容管理', icon: 'table' },
//       hidden: true
//     }
//   ]
// })
/////////////////////////////////////
// constantRoutes.push({
//   path: '/project',
//   component: Layout,
//   redirect: '/project/list',
//   name: '项目管理',
//   meta: { title: '项目管理', icon: 'example' },
//   children: [
//     {
//       path: 'list',
//       name: '项目列表',
//       component: () => import('@/views/project/project-list/index'),
//       meta: { title: '项目列表', icon: 'table' }
//     },
//     {
//       path: 'edit',
//       name: '项目编辑',
//       component: () => import('@/views/project/project-edit/index'),
//       meta: { title: '项目编辑', icon: 'table' }
//     },
//     // {
//     //   path: 'prev',
//     //   name: '项目预览',
//     //   component: () => import('@/views/project/project-prev/index'),
//     //   meta: { title: '项目预览', icon: 'table' }
//     // }
//   ]
// })

constantRoutes.push({
  path: '/prev',
  name: '项目预览',
  component: () => import('@/views/project/project-prev/index'),
  meta: { title: '项目编辑', icon: 'table' }
})
constantRoutes.push({
  path: '/edit',
  name: '项目编辑',
  component: () => import('@/views/project/project-edit/index'),
  meta: { title: '项目编辑', icon: 'table' }
})

constantRoutes.push({ path: '*', redirect: '/404', hidden: true })

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
