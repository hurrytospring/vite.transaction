// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import { Menu, Submenu, MenuItem, Select, Option } from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

Vue.config.productionTip = false
// Vue.use(ElementUI)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Select)
Vue.use(Option)

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  render: h => h(App)
})
