<template>
  <div>
    <h2 class="topic"> {{topic}} </h2>
    <br>
    <div class="navMenu">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#ffffff" text-color="#000000" active-text-color="#3498db">
        <el-menu-item index="1"><a href="/" class="nav-item">首页</a></el-menu-item>
        <el-submenu index="2">
          <template slot="title">一级地址</template>
          <el-menu-item index="2-1"><a href="/oneLevelAddrDetail" class="nav-item">具体某天交易量</a></el-menu-item>
          <el-menu-item index="2-2"><a href="/" class="nav-item">历史交易量排名</a></el-menu-item>
        </el-submenu>
        <el-menu-item index="3"><a href="/marketDetail" class="nav-item">交易所交易详情</a></el-menu-item>
      </el-menu>
    </div>
    <div class="line"></div>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: "Header",
  data () {
    return {
      topic: "欢迎使用交易聚合系统",
      activeIndex: "1"
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.nav-item {
  padding: 0 33px;
  text-decoration: none;
  display: block;
}
</style>
