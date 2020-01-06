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

      // backup
      // dashboard
      /*{
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: '仪表盘',
          keepAlive: true,
          icon: 'table',
          permission: ['dashboard']
        },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: '工作台',
              keepAlive: true,
              permission: ['dashboard']
            }
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: PageView,
        meta: { title: '表单页', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true, permission: ['form'] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: ['table'] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: ['table'] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: '搜索列表（项目）', permission: ['table'] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: '搜索列表（应用）', permission: ['table'] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: ['profile'] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: ['profile'] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: ['profile'] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: {
          title: '结果页',
          icon: 'check-circle-o',
          permission: ['result']
        },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () =>
              import(/!* webpackChunkName: "result" *!/ '@/views/result/Success'),
            meta: {
              title: '成功',
              keepAlive: false,
              hiddenHeaderContent: true,
              permission: ['result']
            }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () =>
              import(/!* webpackChunkName: "result" *!/ '@/views/result/Error'),
            meta: {
              title: '失败',
              keepAlive: false,
              hiddenHeaderContent: true,
              permission: ['result']
            }
          }
        ]
      }*/
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
