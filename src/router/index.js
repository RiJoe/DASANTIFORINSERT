import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import TableInsert from '../components/tableInsert/TableInsert'
import InsertEnterpriseDetails from '../components/enterpriseInput/InsertEnterpriseDetails'
import Login from '../components/Login'
import EnterpriseDistributionMap from '../components/riskDistributionMap/EnterpriseDistributionMap'
import EnterpriseInformation from '../components/enterpriseInformation/EnterpriseInformation'
import EnterpriseRiskDetails from '../components/enterpriseInformation/EnterpriseRiskDetails'
import EnterpriseTableDetails from '../components/enterpriseInformation/EnterpriseTableDetails'
import OtherEnterpriseRiskDetails from '../components/enterpriseInformation/OtherEnterpriseRiskDetails'

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
      redirect: '/enterpriseInformation',
      children: [
        {
          path: '/tableinsert',
          component: TableInsert
        },
        {
          path: '/insertEnterpriseDetails',
          component: InsertEnterpriseDetails
        },
        {
          path: '/enterpriseDistributionMap',
          component: EnterpriseDistributionMap
        },
        {
          path: '/enterpriseInformation',
          component: EnterpriseInformation
        },
        {
          path: '/enterpriseRiskDetails',
          component: EnterpriseRiskDetails
        },
        {
          path: '/enterpriseTableDetails',
          component: EnterpriseTableDetails
        },
        {
          path: '/otherEnterpriseRiskDetails',
          component: OtherEnterpriseRiskDetails
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
