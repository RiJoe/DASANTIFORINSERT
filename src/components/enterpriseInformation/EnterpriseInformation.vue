<template>
  <div >
  <el-row>
    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>重大风险数量</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="majorDetails">企业详情</el-button>
        </div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <p v-if="majorLevel === ''" style="font-size: 40px; color: #F56C6C; margin: 0; padding-top: 25px">
                0
              </p>
              <p v-else style="font-size: 40px; color: #F56C6C; margin: 0; padding-top: 25px">
                {{majorLevel.count}}
              </p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>较大风险数量</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="largerDetails">企业详情</el-button>
        </div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <p v-if="largerLevel === ''" style="font-size: 40px; color: #E6A23C; margin: 0; padding-top: 25px">
                0
              </p>
              <p v-else style="font-size: 40px; color: #E6A23C; margin: 0; padding-top: 25px">
                {{largerLevel.count}}
              </p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>一般风险数量</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="generalDetails">企业详情</el-button>
        </div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <p v-if="generalLevel === '' " style="font-size: 40px; color: #FFFF77; margin: 0; padding-top: 25px">
                0
              </p>
              <p v-else style="font-size: 40px; color: #FFFF77; margin: 0; padding-top: 25px">
                {{generalLevel.count}}
              </p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>低风险数量</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="lowDetails">企业详情</el-button>
        </div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <p v-if="lowLevel === '' " style="font-size: 40px; color: #409EFF; margin: 0; padding-top: 25px">
                0
              </p>
              <p v-else style="font-size: 40px; color: #409EFF; margin: 0; padding-top: 25px">
                {{lowLevel.count}}
              </p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可接受数量</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="receptionDetails">企业详情</el-button>
        </div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <p v-if="noLevel === '' " style="font-size: 40px; color: #67C23A; margin: 0; padding-top: 25px">
                0
              </p>
              <p v-else style="font-size: 40px; color: #67C23A; margin: 0; padding-top: 25px">
                {{noLevel.count}}
              </p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>其他企业数量</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="otherDetails">企业详情</el-button>
        </div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <p style="font-size: 40px; color: #909399; margin: 0; padding-top: 25px">
                {{otherEnterpriseCount}}
              </p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-row >
    <el-col :span="16">
      <el-card class="echert-box-card" :body-style="{height: myHeight}">
        <div slot="header" class="clearfix">
          <span>数据概览</span>
        </div>
          <div id="main"></div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="echert-box-card" :body-style="{height: myHeight}">
        <div slot="header" class="clearfix">
          <span>其他企业数据概览</span>
        </div>
        <div id="otherMain">
          <el-table
            height="93%"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              fixed
              label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              label="单位名称"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.otherCompanyName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="负责人"
              width="120">
              <template slot-scope="scope">
                <span >{{ scope.row.otherPrincipal }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="电话"
              width="120">
              <template slot-scope="scope">
                <span >{{ scope.row.otherNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="经度"
              width="80">
              <template slot-scope="scope">
                <span >{{ scope.row.otherLng }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="纬度"
              width="80">
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
        </div>
      </el-card>
    </el-col>
  </el-row>
    <el-dialog
      :title="otherEnterpriseCompanyName"
      :visible.sync="dialogVisible"
      width="40%">
      <div id="otherPie">
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      otherEnterpriseCompanyName: '',
      dialogVisible: false,
      page: '',
      tableData: [],
      majorLevel: '',
      largerLevel: '',
      generalLevel: '',
      lowLevel: '',
      noLevel: '',
      otherEnterpriseCount: ''
    }
  },
  computed: {
    myHeight: function () {
      return (window.innerHeight - 363) + 'px'
    }
  },
  mounted () {
    this.getEnterpriseRiskCount()
    this.getOtherEnterpriseCount()
    this.drawLine()
    this.getAllOtherEnterprise(1)
  },
  methods: {
    // 查看企业详细信息
    handleEdit (index, row) {
      this.otherEnterpriseCompanyName = row.otherCompanyName
      this.drawOtherPie(row.id)
      this.dialogVisible = true
    },
    // 分页获取当前页信息
    handleCurrentChange (val) {
      // val当前页pageNum的值 获取分页信息
      this.getAllOtherEnterprise(val)
    },
    // 获取所有其他企业信息
    async getAllOtherEnterprise (pageNum) {
      const {data: res} = await this.$http.get('/get/all/other/enterprise', {
        params: {
          'pageNum': pageNum,
          'pageSize': 6
        }
      })
      if (res.result === 'SUCCESS') {
        this.tableData = res.data.content
        this.page = res.data
      }
    },
    // 获取其他企业信息数量
    async getOtherEnterpriseCount () {
      const {data: res} = await this.$http.get('get/other/enterprise/count')
      if (res.result === 'SUCCESS') {
        this.otherEnterpriseCount = res.data
      } else {
        this.otherEnterpriseCount = 0
      }
    },
    // 路由跳转到其他企业
    otherDetails () {
      this.$router.push({path: '/otherEnterpriseRiskDetails'})
    },
    // 路由跳转到相关企业的信息展示table
    receptionDetails () {
      this.$router.push({path: '/enterpriseRiskDetails', query: {riskLevel: '可接受'}})
    },
    majorDetails () {
      this.$router.push({path: '/enterpriseRiskDetails', query: {riskLevel: '重大风险'}})
    },
    largerDetails () {
      this.$router.push({path: '/enterpriseRiskDetails', query: {riskLevel: '较大风险'}})
    },
    generalDetails () {
      this.$router.push({path: '/enterpriseRiskDetails', query: {riskLevel: '一般风险'}})
    },
    lowDetails () {
      this.$router.push({path: '/enterpriseRiskDetails', query: {riskLevel: '低风险'}})
    },
    // 企业各风险数量情况
    async getEnterpriseRiskCount () {
      const {data: res} = await this.$http.get('/get/enterprise/risk/count')
      if (res.result === 'SUCCESS') {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].riskLevel === '重大风险') {
            this.majorLevel = res.data[i]
          } else if (res.data[i].riskLevel === '较大风险') {
            this.largerLevel = res.data[i]
          } else if (res.data[i].riskLevel === '一般风险') {
            this.generalLevel = res.data[i]
          } else if (res.data[i].riskLevel === '低风险') {
            this.lowLevel = res.data[i]
          } else {
            this.noLevel = res.data[i]
          }
        }
      }
    },
    async drawLine () {
      const {data: res} = await this.$http.get('/get/enterprise/risk/count')
      let majorLevelCount = 0
      let largerLevelCount = 0
      let generalLevelCount = 0
      let lowLevelCount = 0
      let noLevelCount = 0
      res.data.forEach((item, index) => {
        if (item.riskLevel === '重大风险') {
          majorLevelCount = item.count
        } else if (item.riskLevel === '较大风险') {
          largerLevelCount = item.count
        } else if (item.riskLevel === '一般风险') {
          generalLevelCount = item.count
        } else if (item.riskLevel === '低风险') {
          lowLevelCount = item.count
        } else {
          noLevelCount = item.count
        }
      })
      // 引入 ECharts 主模块
      const echarts = require('echarts/lib/echarts')
      // 引入柱状图
      require('echarts/lib/chart/bar')
      // 引入圆
      require('echarts/lib/chart/pie')
      // 引入提示框和标题组件
      require('echarts/lib/component/tooltip')
      require('echarts/lib/component/title')
      require('echarts/lib/component/legend')

      const myChart = echarts.init(document.getElementById('main'))
      const options = {
        title: {
          text: '风险比重百分比',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '数量（百分比）',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: majorLevelCount,
                name: '重大风险',
                itemStyle: {
                  color: '#F56C6C'
                }},
              {value: largerLevelCount,
                name: '较大风险',
                itemStyle: {
                  color: '#E6A23C'
                }
              },
              {value: generalLevelCount,
                name: '一般风险',
                itemStyle: {
                  color: '#FFFF77'
                }
              },
              {value: lowLevelCount,
                name: '低风险',
                itemStyle: {
                  color: '#409EFF'
                }
              },
              {value: noLevelCount,
                name: '可接受',
                itemStyle: {
                  color: '#67C23A'
                }
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(options)
    },
    async drawOtherPie (otherEnterpriseId) {
      const {data: res} = await this.$http.get('/get/other/enterprise/count/by/id', {
        params: {
          'otherEnterpriseId': otherEnterpriseId
        }
      })
      let majorLevelCount = 0
      let largerLevelCount = 0
      let generalLevelCount = 0
      let lowLevelCount = 0
      let noLevelCount = 0
      if (res.result === 'SUCCESS') {
        res.data.forEach((item, index) => {
          if (item.riskLevel === '重大风险') {
            majorLevelCount = item.count
          } else if (item.riskLevel === '较大风险') {
            largerLevelCount = item.count
          } else if (item.riskLevel === '一般风险') {
            generalLevelCount = item.count
          } else if (item.riskLevel === '低风险') {
            lowLevelCount = item.count
          } else {
            noLevelCount = item.count
          }
        })
      } else {
        this.$message.error('获取数据失败')
      }
      // 引入 ECharts 主模块
      const echarts = require('echarts/lib/echarts')
      // 引入柱状图
      require('echarts/lib/chart/bar')
      // 引入圆
      require('echarts/lib/chart/pie')
      // 引入提示框和标题组件
      require('echarts/lib/component/tooltip')
      require('echarts/lib/component/title')
      require('echarts/lib/component/legend')

      const myChart = echarts.init(document.getElementById('otherPie'))
      const options = {
        title: {
          text: '主要风险类别比重百分比',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '数量（百分比）',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: majorLevelCount,
                name: '重大风险',
                itemStyle: {
                  color: '#F56C6C'
                }},
              {value: largerLevelCount,
                name: '较大风险',
                itemStyle: {
                  color: '#E6A23C'
                }
              },
              {value: generalLevelCount,
                name: '一般风险',
                itemStyle: {
                  color: '#FFFF77'
                }
              },
              {value: lowLevelCount,
                name: '低风险',
                itemStyle: {
                  color: '#409EFF'
                }
              },
              {value: noLevelCount,
                name: '可接受',
                itemStyle: {
                  color: '#67C23A'
                }
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(options)
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .box-card{
    height: 200px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .echert-box-card{
    height: 100%
  }
  .el-row {
    margin-bottom: 1px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 100%;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    height: 100%;
    width: 100%;
  }

  .el-carousel__item:nth-child(2n+1) {
    height: 100%;
    width: 100%;
  }
  .el-carousel__indicator{
    background-color: black;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    display: block;
    height: 80px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 2px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  h5{
    padding-top: 10px;
    margin: 0;
  }
  #main{
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }
  #otherMain{
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }
  #otherPie{
    width: 100%;
    height: 300px;
  }
</style>
