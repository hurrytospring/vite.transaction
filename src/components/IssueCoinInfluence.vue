<template>
  <div class="container">
    <!-- <h2 class="topic"> {{topic}} </h2> -->
    <Header></Header>
    <br>
    <div class="container-label">
      <label>查询</label>
      <el-select v-model="timStr" placeholder="请选择">
        <el-option v-for="item in dateList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <label>发币之后2天内对交易所</label>
      <el-select v-model="market" placeholder="请选择">
        <el-option v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <label>的影响</label>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="queryDetail">Query</button>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="export2Excel">Export</button>
    </div>
    <label></label>
    <br>
    <table>
      <thead>
        <tr>
          <th>一级地址</th>
          <th>一级地址流出</th>
          <th>最后一级地址流出</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in resultDetail" :key="tx.Address">
          <td>{{tx.Address}}</td>
          <td>{{tx.OneValue}}</td>
          <td>{{tx.LastValue}}</td>
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
  name: "IssueCoinInfluence",
  data () {
    return {
      resultDetail: [],
      dateList: [{
        value: "2018-07-15",
        label: "2018-07-15"
      }],
      timStr: "",
      options: [{
        value: "0xf7793d27a1b76cdf14db7c83e82c772cf7c92910",
        label: "Bilaxy"
      }, {
        value: "0xb9ee1e551f538a464e8f8c41e9904498505b49b0",
        label: "Coinex"
      }, {
        value: "0x2a0c0dbecc7e4d658f48e01e3fa353f44050c208",
        label: "Idex"
      }, {
        value: "0x6cc5f688a315f3dc28a7781717a9a798a59fda7b",
        label: "Okex"
      }],
      market: ""
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
        let oneValue = obj[i].OneValue
        let lastValue = obj[i].LastValue
        this.resultDetail.push({
          Address: address,
          OneValue: oneValue,
          LastValue: lastValue
        })
      }
    },
    queryDetail: function () {
      let self = this
      console.log(this.market)
      console.log(this.timStr)
      this.resultDetail = []
      get("/issueCoinInfluence", {Address: self.market, Day: self.timStr}).then((addrListDetail) => {
        self.strHandle(addrListDetail)
      }).catch((err) => {
        console.log(err)
      })
    },
    export2Excel: function () {
      require.ensure([], () => {
        const tHeader = ["Address", "OneValue", "LastValue"]
        const filterVal = ["Address", "OneValue", "LastValue"]
        const list = this.resultDetail
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, "发币影响")
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
