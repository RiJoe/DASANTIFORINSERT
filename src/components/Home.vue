<template>
  <el-container>
    <el-header>
      <div class="home-header">
        <img src="../assets/logo.png" alt="" @click="imageToHome">
        企业风险录入系统
      </div>
      <div>
        <el-button type="info" @click="logOut">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router>
          <el-menu-item index="/insertEnterpriseDetails">
            <i class="el-icon-user-solid"></i>
            <span slot="title">企业信息录入</span>
          </el-menu-item>
          <el-menu-item index="/tableinsert">
            <i class="el-icon-user-solid"></i>
            <span slot="title">评估表模板录入</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    imageToHome () {
      // this.$router.replace('/home')
    },
    logOut () {
      // window.sessionStorage.removeItem('userId')
      // this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .home-header{
    display: flex;
    font-size: 20px;
  }
  img{
    height: 60px;
    width: 60px;
  }

  .el-container{
    height: 100%;
    width: 100%;
  }
  .el-header{
    display: flex;
    background-color: white;
    text-align: center;
    line-height: 60px;
    justify-content: space-between;
  }
  .el-aside {
    background-color: white;
    text-align: left;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    padding: 0;
    text-align: center;
    line-height: 20px;
  }
</style>
