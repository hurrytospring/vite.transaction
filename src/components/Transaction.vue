<template>
  <div class="container">
    <Header></Header>
    <br>
    <div class="container-label">
      <label>查询一级地址历史转出总数TOP排名</label>
      <!-- <input type="text" id="condition" class="label-query" placeholder="2018-08-03"> -->
      <label></label>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="queryDetail">Query</button>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="export2Excel">Export</button>
    </div>
    <label></label>
    <br>
    <table>
      <thead>
        <tr>
          <th>一级地址</th>
          <th>流出总量</th>
          <th>流入总量</th>
          <th>净流出</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in transaction" :key="tx.Address">
          <td>{{tx.Address}}</td>
          <td>{{tx.OutSum}}</td>
          <td>{{tx.InSum}}</td>
          <td>{{tx.Res}}</td>
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
  name: "Transaction",
  data () {
    return {
      transaction: []
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
        let outSum = obj[i].OutSum
        let inSum = obj[i].InSum
        let res = obj[i].Res
        this.transaction.push({
          Address: address,
          OutSum: outSum,
          InSum: inSum,
          Res: res
        })
      }
    },
    queryDetail: function () {
      let self = this
      this.transaction = []
      get("/oneLevelTxDetail").then((addrListDetail) => {
        self.strHandle(addrListDetail)
        // console.log(addrListDetail)
      }).catch((err) => {
        console.log(err)
      })
    },
    export2Excel: function () {
      require.ensure([], () => {
        const tHeader = ["Address", "OutSum", "InSum", "Res"]
        const filterVal = ["Address", "OutSum", "InSum", "Res"]
        const list = this.transaction
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, "一级地址历史总量")
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
