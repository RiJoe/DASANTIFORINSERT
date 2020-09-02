<template>
    <div>
      <el-page-header @back="goBack" content="其他企业详情">
      </el-page-header>
      <el-table
        :height="tableHeight"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          fixed
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          fixed
          label="单位名称"
          width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.otherCompanyName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="负责人"
          width="180">
          <template slot-scope="scope">
            <span >{{ scope.row.otherPrincipal }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
          width="180">
          <template slot-scope="scope">
            <span >{{ scope.row.otherNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="经度"
          width="180">
          <template slot-scope="scope">
            <span >{{ scope.row.otherLng }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="纬度"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.otherLat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
      <el-dialog
        :title="otherEnterpriseCompanyName"
        :visible.sync="dialogVisible"
        width="50%">
        <div class="mytable">
          <table border="1" cellspacing="0" align="center">
            <tr>
              <th>评估类别</th>
              <th>主要风险类别</th>
              <th>L</th>
              <th>E</th>
              <th>C</th>
              <th>R</th>
              <th>风险等级</th>
            </tr>
            <tr v-for="(item,index) in this.otherEnterpriseDetails" :key="index">
              <td>{{item.valuationCategory}}</td>
              <td>{{item.majorRiskCategory}}</td>
              <td>{{item.judgeL}}</td>
              <td>{{item.judgeE}}</td>
              <td>{{item.judgeC}}</td>
              <td>{{item.judgeR}}</td>
              <td v-if="item.riskLevel === '重大风险'" bgcolor="#F56C6C">重大风险</td>
              <td v-else-if="item.riskLevel === '较大风险'" bgcolor="orange">较大风险</td>
              <td v-else-if="item.riskLevel === '一般风险'" bgcolor="yellow">一般风险</td>
              <td v-else-if="item.riskLevel === '低风险'" bgcolor="#409EFF">低风险</td>
              <td v-else bgcolor="#67C23A">可接受</td>
            </tr>
          </table>
          <p>
            附：风险评估方法
          </p>
          <p>
            城市具有人员高度集中的特点，应当充分考虑人员聚集带来的城市风险。基于人群暴 露程度的风险评估方法利用灾害事故发生的可能性、人群暴露于危险环境的程度和发生灾 害事故可能造成的后果严重性三种因素指标值的乘积来评估风险大小。各项因素的赋值见 附表1，各项分数值及相应的判定因素也可根据实际情况进行调整。
          </p>
          <table border="1" cellspacing="0" align="center">
            <tr>
              <th colspan="2">发生灾害事故的可能性(L)</th>
            </tr>
            <tr>
              <td>分数值</td>
              <td>事故发生可能性</td>
            </tr>
            <tr>
              <td>10</td>
              <td>完全可以预料</td>
            </tr>
            <tr>
              <td>6</td>
              <td>相当可能</td>
            </tr>
            <tr>
              <td>3</td>
              <td>可能，但不经常</td>
            </tr>
            <tr>
              <td>1</td>
              <td>可能性小</td>
            </tr>
            <tr>
              <td>0.5</td>
              <td>很不可能</td>
            </tr>
            <tr>
              <td>0.1</td>
              <td>极不可能</td>
            </tr>
            <tr>
              <th colspan="2">人群暴露于危险环境的程度(E)</th>
            </tr>
            <tr>
              <td>分数值</td>
              <td>人群暴露于危险环境的程度</td>
            </tr>
            <tr>
              <td>10</td>
              <td>大量敏感人群直接暴露于危险环境中</td>
            </tr>
            <tr>
              <td>6</td>
              <td>少量敏感人群直接暴露于危险环境中</td>
            </tr>
            <tr>
              <td>3</td>
              <td>大量非敏感人群直接暴露于危险环境中</td>
            </tr>
            <tr>
              <td>2</td>
              <td>有一定量的非敏感人群直接暴露于危险环境中</td>
            </tr>
            <tr>
              <td>1</td>
              <td>少量非敏感人群暴露于危险环境中</td>
            </tr>
            <tr>
              <td>0.5</td>
              <td>几乎没有人群暴露于危险环境中</td>
            </tr>
            <tr>
              <th colspan="2">发生灾害事故后果严重性(C)</th>
            </tr>
            <tr>
              <td>分数值</td>
              <td>发生灾害事故产生的后果</td>
            </tr>
            <tr>
              <td>100</td>
              <td>造成 30 人以上（含 30 人）死亡，或者 100 人以上重伤（包括急性工业中毒，下同），或者 1 亿元以上直接经济损失。</td>
            </tr>
            <tr>
              <td>40</td>
              <td>造成 10 人～29 人死亡，或者 50 人～99 人重伤，或者 5000万元以上 1 亿元以下直接经济损失。</td>
            </tr>
            <tr>
              <td>15</td>
              <td>造成 3 人～9 人死亡，或者 10 人～49 人重伤，或者 1000 万元以上 5000 万元以下直接经济损失。</td>
            </tr>
            <tr>
              <td>7</td>
              <td>造成 3 人以下死亡，或者 10 人以下重伤，或者 1000 万元以下直接经济损失。</td>
            </tr>
            <tr>
              <td>3</td>
              <td>无人员死亡，致残或重伤，或很小的财产损失。</td>
            </tr>
            <tr>
              <td>1</td>
              <td>引人注目，不利于基本的安全要求。</td>
            </tr>
            <tr>
              <td colspan="2">注：敏感人群是指在灾害事故场景下自我防护能力相对较低的群体，包括中小学生、医院病人、养 老院老人等。</td>
            </tr>
          </table>
          <p>风险等级由R值的大小确定，不同风险等级对应的R值一般根据经验进行划分，风险分级标准可参考表附表2执行，也可根据实际情况自行划定。</p>
          <br>
          <p>附表2 风险分级标准</p>
          <table border="1" cellspacing="0" align="center">
            <tr>
              <th>风险分级标准(R)</th>
              <th>风险等级</th>
              <th>措施</th>
              <th>表示色</th>
            </tr>
            <tr>
              <td>≥720</td>
              <td>重大风险</td>
              <td>不可容许、停工</td>
              <td bgcolor="#F56C6C">红色</td>
            </tr>
            <tr>
              <td>720＞R≥240</td>
              <td>较大风险</td>
              <td>立即整改，方案、验收</td>
              <td bgcolor="orange">橙色</td>
            </tr>
            <tr>
              <td>240＞R≥150</td>
              <td>一般风险</td>
              <td>需要整改，整改、检查</td>
              <td bgcolor="yellow">黄色</td>
            </tr>
            <tr>
              <td>150＞R≥70</td>
              <td>低风险</td>
              <td>需要注意，培训、检查</td>
              <td bgcolor="#409EFF">蓝色</td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
          <!--文档下载连接-->
        <el-link :href="otherWordUrl" :disabled="linkIsDisabled">
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
      tableData: [],
      page: '',
      dialogVisible: false,
      otherEnterpriseCompanyName: '',
      otherEnterpriseDetails: [],
      otherWordUrl: '',
      linkIsDisabled: true
    }
  },
  mounted () {
    this.getAllOtherEnterprise(1)
  },
  methods: {
    // word文档下载
    wordDownDialogVisible () {
      if (this.otherWordUrl === '' || this.otherWordUrl === null) {
        this.$message.error('文档未上传！此文档不可下载')
        this.dialogVisible = true
      } else {
        this.$message.success('文档下载成功')
        this.dialogVisible = false
      }
    },
    // 获取文档路径，若路径不存在则把link禁掉，再wordDownDialogVisible ()进行相关提示
    async getOtherWordUrl (otherEnterpriseId) {
      const {data: res} = await this.$http.get('/get/other/word/url', {
        params: {
          'otherEnterpriseId': otherEnterpriseId
        }
      })
      if (res.result === 'SUCCESS') {
        if (res.data === '' || res.data === null) {
          this.otherWordUrl = ''
          this.linkIsDisabled = true
        } else {
          this.otherWordUrl = res.data
          this.linkIsDisabled = false
        }
      }
    },
    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },
    // 查看企业详细信息
    handleEdit (index, row) {
      this.otherEnterpriseCompanyName = row.otherCompanyName
      this.getAllOtherEnterpriseDetails(row.id)
      this.getOtherWordUrl(row.id)
      this.dialogVisible = true
    },
    // 分页获取当前页信息
    handleCurrentChange (val) {
      // val当前页pageNum的值 获取分页信息
      this.getAllOtherEnterprise(val)
    },
    // 通过其他企业id获取相应的详细信息
    async getAllOtherEnterpriseDetails (otherEnterpriseId) {
      const {data: res} = await this.$http.get('/get/other/enterprise/details/by/id', {
        params: {
          'otherEnterpriseId': otherEnterpriseId
        }
      })
      if (res.result === 'SUCCESS') {
        this.otherEnterpriseDetails = res.data
      }
    },
    // 获取所有其他企业信息
    async getAllOtherEnterprise (pageNum) {
      const {data: res} = await this.$http.get('/get/all/other/enterprise', {
        params: {
          'pageNum': pageNum,
          'pageSize': 10
        }
      })
      if (res.result === 'SUCCESS') {
        this.tableData = res.data.content
        this.page = res.data
      }
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
  .el-pagination{
    background: white;
  }
  table{
    border-collapse: collapse;
    background: white;
  }
  .mytable{
    padding-bottom: 40px;
  }
</style>
