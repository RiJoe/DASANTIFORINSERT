<template>
  <div>
    <el-page-header @back="goBack" :content="this.$route.query.riskLevel+'企业详情'">
    </el-page-header>
    <el-table
      :height="tableHeight"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50">
      </el-table-column>
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
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :page-size="page.pageSize"
      :total="page.totalSize">
    </el-pagination>
    <!--进行文档在线显示-->
    <el-dialog
      :title="enterpriseInform.companyName"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <div class="mytable">
        <table border="1" cellspacing="0" align="center">
          <!--表头-->
          <tr>
            <th>类别</th>
            <th>影响因素</th>
            <th>判定要素</th>
            <th>赋分标准</th>
            <th>具体情况</th>
            <th>现场照片</th>
          </tr>
          <!--已选的选项和图片显示-->
          <tr v-for="(item,index) in tableDetails" :key="index">
            <td v-if="item.categoryId === 1" rowspan="1">事故后果</td>
            <td v-else-if="item.categoryId === 2">可能性</td>
            <td v-else-if="item.categoryId === 3">暴露程度</td>
            <td>{{item.influenceFactor}}</td>
            <td>{{item.determineFactor}}</td>
            <td>{{item.score}}</td>
            <td>{{item.check}}</td>
            <td><el-image
              style="width: 30px; height: 30px"
              :src="item.photo[0]"
              :preview-src-list="item.photo">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
              <div slot="error" class="image-slot">
                <p></p>
              </div>
            </el-image></td>
          </tr>
          <!--企业信息展示-->
          <tr>
            <td>风险值</td>
            <td>{{enterpriseInform.riskValue}}</td>
            <td>措施</td>
            <td>{{enterpriseInform.measure}}</td>
            <td colspan="2">事故风险值=事故后果*事故可能性*人群暴露程度</td>
          </tr>
          <tr>
            <td>主要危险源</td>
            <td>{{enterpriseInform.majorDanger}}</td>
            <td>主要风险名称</td>
            <td colspan="3">{{enterpriseInform.majorRiskName}}</td>
          </tr>
          <tr>
            <td>单位名称</td>
            <td>{{enterpriseInform.companyName}}</td>
            <td>地址</td>
            <td>{{enterpriseInform.address}}</td>
            <td>经纬度</td>
            <td>{{enterpriseInform.lng}}<br>{{enterpriseInform.lat}}</td>
          </tr>
          <tr>
            <td>主要负责人</td>
            <td>{{enterpriseInform.principal}}</td>
            <td>填报人及联系电话</td>
            <td>{{enterpriseInform.informant}}<br>{{enterpriseInform.informantNumber}}</td>
            <td>全员人数</td>
            <td>{{enterpriseInform.totalNumber}}</td>
          </tr>
        </table>
        <!--计算规则显示-->
        <p>计算说明：</p>
        <p v-for="(item, index) in tableRiskDetails.computerExplainList" :key="index">{{item.computerCount}}</p>
        <!--风险判定表-->
        <h5>附：工业企业点位风险等级判定表</h5>
        <table border="1" cellspacing="0" align="center">
          <tr>
            <th>风险分级标准(R)</th>
            <th>风险等级</th>
            <th>措施</th>
            <th>表示色</th>
          </tr>
          <tr>
            <td>{{tableRiskDetails.rmajorRisk}}</td>
            <td>重大风险</td>
            <td>不可容许、停工</td>
            <td bgcolor="#F56C6C">红色</td>
          </tr>
          <tr>
            <td>{{tableRiskDetails.rlargerRisk}}</td>
            <td>较大风险</td>
            <td>立即整改，方案、验收</td>
            <td bgcolor="orange">橙色</td>
          </tr>
          <tr>
            <td>{{tableRiskDetails.rgeneralRisk}}</td>
            <td>一般风险</td>
            <td>需要整改，整改、检查</td>
            <td bgcolor="yellow">黄色</td>
          </tr>
          <tr>
            <td>{{tableRiskDetails.rlowRisk}}</td>
            <td>低风险</td>
            <td>需要注意，培训、检查</td>
            <td bgcolor="#409EFF">蓝色</td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
        <!--文档下载连接-->
      <el-link :href="wordUrl" :disabled="linkIsDisabled">
      <el-button type="primary" @click="wordDownDialogVisible">下载文档</el-button>
      </el-link>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableHeight: window.innerHeight - 126,
      wordUrl: '',
      linkIsDisabled: true,
      tableDetails: [],
      tableRow: 0,
      url: '',
      srcList: [],
      dialogVisible: false,
      myHeight: window.innerHeight - 123,
      page: '',
      tableData: [],
      enterpriseInform: '',
      tableRiskDetails: ''
    }
  },
  mounted () {
    this.getAllMajorEnterprise(1)
  },
  methods: {
    // 文档下载
    wordDownDialogVisible () {
      if (this.wordUrl === '' || this.wordUrl === null) {
        this.$message.error('文档未上传！此文档不可下载')
        this.dialogVisible = true
      } else {
        this.$message.success('文档下载成功')
        this.dialogVisible = false
      }
    },
    // 获取文档路径，若路径不存在则把link禁掉，再wordDownDialogVisible ()进行相关提示
    async getWordUrl (enterpriseId) {
      const {data: res} = await this.$http.get('/get/word/url', {
        params: {
          'enterpriseId': enterpriseId
        }
      })
      if (res.result === 'SUCCESS') {
        if (res.data === '' || res.data === null) {
          this.wordUrl = ''
          this.linkIsDisabled = true
        } else {
          this.wordUrl = res.data
          this.linkIsDisabled = false
        }
      }
    },
    // 获取模板底部信息进行展示
    async getTableRiskDetails (tableId) {
      const {data: res} = await this.$http.get('/get/table/risk/details/by/id', {
        params: {
          'tableId': tableId
        }
      })
      if (res.result === 'SUCCESS') {
        this.tableRiskDetails = res.data
      }
    },
    // 获取模板详细信息，图片和已勾选进行展示
    async getTableDetailsByTableId (row) {
      this.enterpriseInform = row
      const {data: res} = await this.$http.get('/get/table/details/by/id', {
        params: {
          'tableId': row.companyType,
          'enterpriseId': row.id
        }
      })
      if (res.result === 'SUCCESS') {
        this.tableDetails = res.data
        this.tableDetails.forEach((item, index) => {
          item.photo = (item.photo || '').split(',')
        })
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    // 分页获取当前页信息
    handleCurrentChange (val) {
      // val当前页pageNum的值 获取分页信息
      this.getAllMajorEnterprise(val)
    },
    // 获取分页请求数据
    async getAllMajorEnterprise (pageNum) {
      const {data: res} = await this.$http.get('/get/all/risk/enterprise', {
        params: {
          'riskLevel': this.$route.query.riskLevel,
          pageNum: pageNum,
          pageSize: 8
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
    // 点击查看展示table详细信息
    handleClick (row) {
      // this.$router.push({path: '/enterpriseTableDetails', query: {row}})
      this.getTableDetailsByTableId(row)
      this.getTableRiskDetails(row.companyType)
      this.getWordUrl(row.id)
      this.dialogVisible = true
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
  .el-page-header__left .el-page-header__title{
  }
  table{
    border-collapse: collapse;
    background: white;
  }
  .mytable{
    padding-bottom: 40px;
  }
  .el-pagination{
    background: white;
  }
</style>
