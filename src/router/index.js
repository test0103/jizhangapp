import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Self from '@/components/Self'
import Tally from '@/components/Tally'
import Index from '@/components/Index/Index'
import Product from '@/components/Product/product'
import Account from '@/components/Account'
import addBook from '@/components/addBook'
import AccountInfo from '@/components/AccountInfo'
import Remember from '@/components/Remember'
import Renemberbianji from '@/components/Renemberbianji'
import bookdetails from '@/components/bookdetails'
import calendarInfo from '@/components/calendarInfo'

//登录注册等页面
import login from '@/components/login/login'
import register from '@/components/login/register'
import findmima from '@/components/login/findmima'
import feedback from '@/components/login/feedback'
import updating from '@/components/login/updating'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect:"/login"
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
          path: '/Self',
          name: 'Self',
          component: Self,
        },
        {
          path: '/Tally',
          name: 'Tally',
          component: Tally,
        },
        {
          path: '/Index',
          name: 'Index',
          component: Index,
        },
        {
          path: '/Account',
          name: 'Account',
          component: Account,
        },
      ]
    },
    {
      path: '/addBook',
      name: 'addBook',
      component: addBook,
    },
    {
      path: '/AccountInfo',
      name: 'AccountInfo',
      component: AccountInfo,
    },
    {
      path: '/Remember',
      name: 'Remember',
      component: Remember,
    },
    {
      path: '/Renemberbianji',
      name: 'Renemberbianji',
      component: Renemberbianji,
    },
    {
      path: '/bookdetails',
      name: 'bookdetails',
      component: bookdetails,
    },
    {
      path: '/calendarInfo',
      name: 'calendarInfo',
      component: calendarInfo,
    },
    //登录 注册等
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/findmima',
      name: 'findmima',
      component: findmima,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback,
    },
    {
    	path:'/product/:id/type/:type',
    	name:'product',
    	component:Product
    },
    {
    	path:'/updating',
    	name:'updating',
    	component:updating
    }
  ]

})
