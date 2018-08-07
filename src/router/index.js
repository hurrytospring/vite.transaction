import Vue from "vue"
import Router from "vue-router"
import Transaction from "@/components/Transaction"
import OneLevelAddrDetail from "@/components/OneLevelAddrDetail"
import MarketDetail from "@/components/MarketDetail"

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Transaction",
      component: Transaction
    }, {
      path: "/oneLevelAddrDetail",
      name: "OneLevelAddrDetail",
      component: OneLevelAddrDetail
    }, {
      path: "/marketDetail",
      name: "MarketAtDayDetail",
      component: MarketDetail
    }
  ]
})
