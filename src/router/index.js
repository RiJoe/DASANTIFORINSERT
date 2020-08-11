import Vue from 'vue'
import Router from 'vue-router'
import Test from '../components/Test'
import Home from '../components/Home'
import InputEnterpriseMessage from '../components/enterpriseInput/InputEnterpriseMessage'
import InputEnterpriseRiskMessage from '../components/enterpriseInput/InputEnterpriseRiskMessage'
import TableInsert from '../components/tableInsert/TableInsert'
import Possibility from '../components/tableInsert/Possibility'
import InsertEnterpriseDetails from '../components/enterpriseInput/InsertEnterpriseDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/insertEnterpriseDetails',
      children: [
        {
          path: '/input',
          component: InputEnterpriseMessage
        },
        {
          path: '/inputriskmessage',
          component: InputEnterpriseRiskMessage
        },
        {
          path: '/tableinsert',
          component: TableInsert
        },
        {
          path: '/possibility',
          component: Possibility
        },
        {
          path: '/insertEnterpriseDetails',
          component: InsertEnterpriseDetails
        }
      ]
    }
  ]
})
