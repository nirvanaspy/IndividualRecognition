// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/signalChoose',
    children: [
      // signalChoose
      {
        path: '/signalChoose',
        name: 'signalChoose',
        component: () => import('@/views/SignalMenu/SignalMenu'),
        meta: {
          title: '信号导航',
          keepAlive: true,
          icon: 'radar-chart',
          permission: ['simApplication']
        }
      },

      // taskManage
      {
        path: '/taskManage',
        name: 'taskManage',
        component: () => import('@/views/TaskManage/TaskManage'),
        meta: {
          title: '任务管理',
          keepAlive: true,
          icon: 'table',
          permission: ['simApplication']
        }
      },

      // data statistics
      {
        path: '/dataStatistics',
        name: 'dataStatistics',
        component: () => import('@/views/DataStatistics/DataStatistics'),
        meta: {
          title: '数据统计',
          keepAlive: true,
          icon: 'pie-chart',
          permission: ['simApplication']
        }
      },

      // state monitor
      {
        path: '/stateMonitor',
        name: 'stateMonitor',
        component: () => import('@/views/StateMonitor/StateMonitor'),
        meta: {
          title: '状态监控',
          keepAlive: true,
          icon: 'camera',
          permission: ['simApplication']
        }
      },

      // system setting
      {
        path: '/systemSetting',
        name: 'systemSetting',
        component: () => import('@/views/SystemSetting/SystemSetting'),
        meta: {
          title: '系统管理',
          keepAlive: true,
          icon: 'setting',
          permission: ['simApplication']
        }
      },

      // work mode
      {
        path: '/workMode',
        name: 'workMode',
        component: () => import('@/views/WorkMode/WorkMode'),
        meta: {
          title: '工作模式',
          keepAlive: true,
          icon: 'appstore',
          level: 3,
          permission: ['simApplication']
        }
      },

      // signal task manage
      {
        path: '/signalTaskManage',
        name: 'signalTaskManage',
        component: () => import('@/views/SignalTaskManage/SignalTaskManage'),
        meta: {
          title: '任务管理',
          keepAlive: true,
          icon: 'schedule',
          level: 3,
          permission: ['simApplication']
        }
      },

      // original data manage
      {
        path: '/originDataManage',
        name: 'originDataManage',
        component: () => import('@/views/OriginDataManage/OriginDataManage'),
        meta: {
          title: '原始数据管理',
          keepAlive: true,
          icon: 'profile',
          level: 3,
          permission: ['simApplication']
        }
      },

      // sample data manage
      {
        path: '/sampleDataManage',
        name: 'sampleDataManage',
        component: () => import('@/views/SampleDataManage/SampleDataManage'),
        meta: {
          title: '样本数据管理',
          keepAlive: true,
          icon: 'project',
          level: 3,
          permission: ['simApplication']
        }
      },

      // model data manage
      {
        path: '/modelDataManage',
        name: 'modelDataManage',
        component: () => import('@/views/ModelDataManage/ModelDataManage'),
        meta: {
          title: '模型数据管理',
          keepAlive: true,
          icon: 'codepen',
          level: 3,
          permission: ['simApplication']
        }
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        hidden: true,
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden: true,
        meta: {
          title: '个人页',
          icon: 'user',
          keepAlive: true,
          permission: ['user']
        },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: '安全设置',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: {
                  title: '个性化设置',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: {
                  title: '账户绑定',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () =>
                  import('@/views/account/settings/Notification'),
                meta: {
                  title: '新消息通知',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
