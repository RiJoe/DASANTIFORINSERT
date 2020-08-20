<template>
  <div>
    <el-page-header @back="goBack" :content="this.$route.query.riskLevel+'企业详情'">
    </el-page-header>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="companyName"
        label="单位名称"
        width="240">
      </el-table-column>
      <el-table-column
        prop="principal"
        label="负责人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="informantNumber"
        label="填报人电话"
        width="120">
      </el-table-column>
      <el-table-column
        prop="riskValue"
        label="风险值"
        width="70">
      </el-table-column>
      <el-table-column
        prop="measure"
        label="措施"
        width="70">
      </el-table-column>
      <el-table-column
        prop="totalNumber"
        label="总人数"
        width="70">
      </el-table-column>
      <el-table-column
        prop="majorDanger"
        label="主要危险源"
        width="120">
      </el-table-column>
      <el-table-column
        prop="majorRiskName"
        label="主要风险名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :total="page.totalPages">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: '',
      tableData: []
    }
  },
  mounted () {
    this.getAllMajorEnterprise(1)
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.getAllMajorEnterprise(val)
    },
    async getAllMajorEnterprise (pageNum) {
      const {data: res} = await this.$http.get('/get/all/risk/enterprise', {
        params: {
          'riskLevel': this.$route.query.riskLevel,
          pageNum: pageNum,
          pageSize: 2
        }
      })
      if (res.result === 'SUCCESS') {
        this.page = res.data
        this.tableData = res.data.content
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>
  .el-page-header{
    margin-top: 1px;
    padding: 2px;
    background-color: white;
  }
</style>
