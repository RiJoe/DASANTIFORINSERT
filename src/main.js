// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './assets/css/global.css'
import {Button, Container, Header, Aside, Main, MenuItem, Menu, Checkbox, CheckboxGroup, Steps, Step, Upload, Form, FormItem, Input, Row, Col, Select, Option, Dialog, Card, Message, MessageBox, Table, TableColumn, Popover, Tag} from 'element-ui'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

Vue.use(Button, Container, Header, Aside, Main, MenuItem, Menu)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Upload)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Tag)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(BaiduMap, {
  ak: 'wFQlNo1lSDLEx8RV6vehHiwLKlx23GNg'
})

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:7000'
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
