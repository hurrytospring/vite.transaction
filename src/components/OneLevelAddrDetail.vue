<template>
  <div class="container">
    <!-- <h2 class="topic"> {{topic}} </h2> -->
    <Header></Header>
    <br>
    <div class="container-label">
      <label>查询特定日期</label>
      <input type="text" id="condition" class="label-query" placeholder="2018-08-03" v-model="datetime">
      <label>一级地址交易详情</label>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="queryDetail">Query</button>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="export2Excel">Export</button>
    </div>
    <label></label>
    <br>
    <table>
      <thead>
        <tr>
          <th>一级地址(Addresses)</th>
          <th>流入量(Inbound)</th>
          <th>流出量(Outbound)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in oneAddrDetail" :key="tx.Address">
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
import {getNowFormatDate} from "../util/util"
import {exportJsonToExcel} from "../vendor/Export2Excel"
import Header from "./Header"
// import "json"
export default {
  name: "OneLevelTxDetail",
  data () {
    return {
      // topic: "欢迎使用交易聚合系统",
      oneAddrDetail: [],
      datetime: ""
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
        this.oneAddrDetail.push({
          Address: address,
          InValue: inValue,
          OutValue: outValue
        })
      }
    },
    queryDetail: function () {
      let self = this
      console.log(getNowFormatDate())
      if (this.datetime === "") {
        this.datetime = getNowFormatDate()
      }
      console.log(this.datetime)
      this.oneAddrDetail = []
      get("/oneLevelAtDayValue", {Day: self.datetime}).then((addrListDetail) => {
        self.strHandle(addrListDetail)
      }).catch((err) => {
        console.log(err)
      })
    },
    export2Excel: function () {
      require.ensure([], () => {
        const tHeader = ["Address", "InValue", "OutValue"]
        const filterVal = ["Address", "InValue", "OutValue"]
        const list = this.oneAddrDetail
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, this.datetime)
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
