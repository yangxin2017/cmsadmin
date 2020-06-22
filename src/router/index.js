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
constantRoutes.push({
  path: '/',
  component: Layout,
  redirect: '/content',
  name: '首页'
})

//add other
constantRoutes.push({
  path: '/content',
  component: Layout,
  redirect: '/content/list',
  name: '内容管理',
  hidden: false,
  meta: { title: '内容管理', icon: 'example' },
  children: [
    {
      path: 'list',
      name: '内容列表',
      component: () => import('@/views/admin/content/list/index'),
      meta: { title: '内容管理', icon: 'table' }
    },
    {
      path: 'add',
      name: '内容编辑',
      component: () => import('@/views/admin/content/add/add'),
      meta: { title: '内容编辑', icon: 'table' }
    }
  ]
})

constantRoutes.push({
  path: '/dept',
  component: Layout,
  redirect: '/dept/list',
  name: '部门管理',
  hidden: false,
  meta: { title: '部门管理', icon: 'example' },
  children: [
    {
      path: 'list',
      name: '部门列表',
      component: () => import('@/views/admin/dept/list'),
      meta: { title: '部门列表', icon: 'table' }
    }
  ]
})

constantRoutes.push({
  path: '/formtool',
  component: Layout,
  redirect: '/formtool/list',
  name: '表单管理',
  hidden: false,
  meta: { title: '表单管理', icon: 'example' },
  children: [
    {
      path: 'list',
      name: '表单列表',
      component: () => import('@/views/formtool/index'),
      meta: { title: '表单列表', icon: 'table' }
    },
    {
      path: 'add',
      name: '添加表单',
      component: () => import('@/views/formtool/adddesign'),
      meta: { title: '添加表单', icon: 'table' }
    },
    {
      path: 'prev',
      name: '表单预览',
      component: () => import('@/views/formtool/prev'),
      meta: { title: '表单预览', icon: 'table' }
    },
    {
      path: 'viewdata',
      name: '表单数据',
      component: () => import('@/views/formtool/viewdata'),
      meta: { title: '表单数据', icon: 'table' }
    }
  ]
})

constantRoutes.push({
  path: '/exttable',
  component: Layout,
  redirect: '/exttable/list',
  name: '表格管理',
  hidden: false,
  meta: { title: '表格管理', icon: 'example' },
  children: [
    {
      path: 'list',
      name: '表格列表',
      component: () => import('@/views/admin/exts/list'),
      meta: { title: '表格列表', icon: 'table' }
    },
  ]
})

constantRoutes.push({
  path: '/seat',
  component: Layout,
  redirect: '/seat/list',
  name: '席位管理',
  hidden: false,
  meta: { title: '席位管理', icon: 'example' },
  children: [
    {
      path: 'list',
      name: '席位列表',
      component: () => import('@/views/admin/seat/list'),
      meta: { title: '席位列表', icon: 'table' }
    },
  ]
})

constantRoutes.push({
  path: '/message',
  component: Layout,
  redirect: '/message/list',
  name: '消息管理',
  hidden: false,
  meta: { title: '消息管理', icon: 'example' },
  children: [
    {
      path: 'list',
      name: '消息列表',
      component: () => import('@/views/admin/message/list'),
      meta: { title: '消息列表', icon: 'table' }
    },
  ]
})

constantRoutes.push({
  path: '/category',
  component: Layout,
  redirect: '/category/list',
  name: '栏目管理',
  hidden: false,
  meta: { title: '栏目管理', icon: 'example' },
  children: [
    {
      path: 'list',
      name: '栏目列表',
      component: () => import('@/views/admin/categorys/list/index'),
      meta: { title: '栏目列表', icon: 'table' }
    },
  ]
})
constantRoutes.push({
  path: '/tag',
  component: Layout,
  redirect: '/tag/list',
  name: '标签管理',
  hidden: false,
  meta: { title: '标签管理', icon: 'example' },
  children: [
    {
      path: 'list',
      name: '标签列表',
      component: () => import('@/views/admin/tags/list/index'),
      meta: { title: '标签列表', icon: 'table' }
    },
  ]
})

constantRoutes.push({
  path: '/user',
  component: Layout,
  redirect: '/user/userlist',
  name: '用户管理',
  hidden: false,
  meta: { title: '用户管理', icon: 'example' },
  children: [
    {
      path: 'rolelist',
      name: '角色列表',
      component: () => import('@/views/admin/role/list/index'),
      meta: { title: '角色列表', icon: 'table' }
    },
    {
      path: 'userlist',
      name: '用户列表',
      component: () => import('@/views/admin/user/list/index'),
      meta: { title: '用户列表', icon: 'table' }
    }
  ]
})
/////////////////////////////////////
constantRoutes.push({
  path: '/project',
  component: Layout,
  redirect: '/project/list',
  name: '项目管理',
  meta: { title: '项目管理', icon: 'example' },
  children: [
    {
      path: 'list',
      name: '项目列表',
      component: () => import('@/views/project/project-list/index'),
      meta: { title: '项目列表', icon: 'table' }
    },
    // {
    //   path: 'edit',
    //   name: '项目编辑',
    //   component: () => import('@/views/project/project-edit/index'),
    //   meta: { title: '项目编辑', icon: 'table' }
    // },
    // {
    //   path: 'prev',
    //   name: '项目预览',
    //   component: () => import('@/views/project/project-prev/index'),
    //   meta: { title: '项目预览', icon: 'table' }
    // }
  ]
})

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
