import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import TableInsert from '../components/tableInsert/TableInsert'
import InsertEnterpriseDetails from '../components/enterpriseInput/InsertEnterpriseDetails'
import Login from '../components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/insertEnterpriseDetails',
      children: [
        {
          path: '/tableinsert',
          component: TableInsert
        },
        {
          path: '/insertEnterpriseDetails',
          component: InsertEnterpriseDetails
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const userId = window.sessionStorage.getItem('userId')
  if (!userId) return next('/login')
  next()
})
export default router
