<template>
  <div class="container">
    <!-- <h2 class="topic"> {{topic}} </h2> -->
    <Header></Header>
    <br>
    <div class="container-label">
      <label>查询特定账户</label>
      <input type="text" id="condition" class="label-query" placeholder="0xf7793d27a1b76cdf14db7c83e82c772cf7c92910" v-model="account">
      <label>历史每天交易详情</label>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="queryDetail">Query</button>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="export2Excel">Export</button>
    </div>
    <label></label>
    <br>
    <table>
      <thead>
        <tr>
          <th>日期</th>
          <th>流入量</th>
          <th>流出量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in accountDetail" :key="tx.Datetim">
          <td>{{tx.Datetim}}</td>
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
  name: "AccountDetail",
  data () {
    return {
      // topic: "欢迎使用交易聚合系统",
      accountDetail: [],
      account: ""
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
        let datetim = obj[i].Datetim
        let inValue = obj[i].InValue
        let outValue = obj[i].OutValue
        this.accountDetail.push({
          Datetim: datetim,
          InValue: inValue,
          OutValue: outValue
        })
      }
    },
    queryDetail: function () {
      let self = this
      this.accountDetail = []
      get("/accountDetail", {Address: self.account}).then((addrListDetail) => {
        self.strHandle(addrListDetail)
      }).catch((err) => {
        console.log(err)
      })
    },
    export2Excel: function () {
      require.ensure([], () => {
        const tHeader = ["Datetim", "InValue", "OutValue"]
        const filterVal = ["Datetim", "InValue", "OutValue"]
        const list = this.accountDetail
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
table,
td,
th {
  border-collapse: collapse;
  border-spacing: 0
}

table {
  width: 70%;
  margin: 0 auto;
  padding-top: 700px;
}

td,
th {
  border: 1px solid #bcbcbc;
  padding: 5px 10px
}

th {
  background: #42b983;
  font-size: 1.2rem;
  font-weight: 400;
  color: #fff;
  cursor: pointer
}

tr:nth-of-type(odd) {
  background: #fff
}

tr:nth-of-type(even) {
  background: #eee
}

fieldset {
  border: 1px solid #BCBCBC;
  padding: 15px;
}

input {
  outline: none
}

input[type=text] {
  border: 1px solid #ccc;
  padding: .5rem .3rem;
}

input[type=text]:focus {
  border-color: #42b983;
}

button {
  outline: none;
  padding: 5px 8px;
  color: #fff;
  border: 1px solid #BCBCBC;
  border-radius: 3px;
  background-color: #009A61;
  cursor: pointer;
}
button:hover{
  opacity: 0.8;
}
</style>
