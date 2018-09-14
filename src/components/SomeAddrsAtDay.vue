<template>
  <div class="container">
    <!-- <h2 class="topic"> {{topic}} </h2> -->
    <Header></Header>
    <br>
    <div class="container-label">
      <label>查询特定日期</label>
      <input type="text" id="condition" class="label-query" placeholder="2018-08-03" v-model="datetime">
      <label>指定地址列表交易详情</label>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="queryDetail">Query</button>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="export2Excel">Export</button>
    </div>
    <label></label>
    <br>
    <div class="text-wrapper">
      <el-input
        type="textarea"
        id="textarea-input1"
        :rows="5"
        placeholder="请输入账户地址，一行一个地址"
        v-model="textarea">
      </el-input>
    </div>
    <br>
    <table>
      <thead>
        <tr>
          <th>账户地址(Addresses)</th>
          <th>流入量(Inbound)</th>
          <th>流出量(Outbound)</th>
          <th>余额(Balances)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in oneAddrDetail" :key="tx.Address">
          <td>{{tx.Address}}</td>
          <td>{{tx.InValue}}</td>
          <td>{{tx.OutValue}}</td>
          <td>{{tx.Balance}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { post } from "../api/axios"
import {getNowFormatDate} from "../util/util"
import {exportJsonToExcel} from "../vendor/Export2Excel"
import Header from "./Header"
// import "json"
export default {
  name: "SomeAddrsAtDay",
  data () {
    return {
      // topic: "欢迎使用交易聚合系统",
      oneAddrDetail: [],
      datetime: "",
      textarea: "",
      addrInput: []
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
        let balance = obj[i].Balance
        this.oneAddrDetail.push({
          Address: address,
          InValue: inValue,
          OutValue: outValue,
          Balance: balance
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
      self.parseAddrTextarea()
      // console.log(this.addrInput)
      post("/someAddrsAtDay", {Day: self.datetime, Addrs: self.addrInput}).then((addrListDetail) => {
        self.strHandle(addrListDetail)
      }).catch((err) => {
        console.log(err)
      })
    },
    parseAddrTextarea: function () {
      this.addrInput = this.textarea.split("\n")
    },
    export2Excel: function () {
      require.ensure([], () => {
        const tHeader = ["Address", "InValue", "OutValue", "Balance"]
        const filterVal = ["Address", "InValue", "OutValue", "Balance"]
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
@import "../assets/css/main.scss";
.text-wrapper {
  width: 70%;
  margin: 0 auto;
}
</style>
