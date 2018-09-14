<template>
  <div class="container">
    <!-- <h2 class="topic"> {{topic}} </h2> -->
    <Header></Header>
    <br>
    <div class="container-label">
      <label>查询交易所历史交易量详情</label>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="queryDetail">Query</button>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="export2Excel">Export</button>
    </div>
    <label></label>
    <br>
    <table>
      <thead>
        <tr>
          <th>交易所地址(Market Addresses)</th>
          <th>流入总量(Inbound)</th>
          <th>流出总量(Outbound)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in marketHistoryValue" :key="tx.Address">
          <td>{{tx.Address}}</td>
          <td>{{tx.InValue}}</td>
          <td>{{tx.OutValue}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { get } from "../api/axios"
import {exportJsonToExcel} from "../vendor/Export2Excel"
import Header from "./Header"
// import "json"
export default {
  name: "marketHistoryValue",
  data () {
    return {
      // topic: "欢迎使用交易聚合系统",
      marketHistoryValue: [],
      marketAddr: ""
    }
  },
  components: {
    Header
  },
  methods: {
    strHandle: function (list) {
      // console.log(list)
      var obj = JSON.parse(list)
      for (let i = 0; i < obj.length; i++) {
        let address = obj[i].Address
        let inValue = obj[i].InValue
        let outValue = obj[i].OutValue
        this.marketHistoryValue.push({
          Address: address,
          InValue: inValue,
          OutValue: outValue
        })
      }
    },
    queryDetail: function () {
      let self = this

      this.marketHistoryValue = []
      get("/marketHistoryValue").then((addrListDetail) => {
        self.strHandle(addrListDetail)
      }).catch((err) => {
        console.log(err)
      })
    },
    export2Excel: function () {
      require.ensure([], () => {
        const tHeader = ["Address", "InValue", "OutValue"]
        const filterVal = ["Address", "InValue", "OutValue"]
        const list = this.marketHistoryValue
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, "交易所历史总量详情")
      })
    },
    formatJson: function (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/main.scss"
</style>
