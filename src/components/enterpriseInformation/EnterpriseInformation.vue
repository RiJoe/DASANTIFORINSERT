<template>
  <div >
  <el-row>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>重大风险数量</span>
          <el-button style="float: right; padding: 3px 0" type="text">企业详情</el-button>
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
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>较大风险数量</span>
          <el-button style="float: right; padding: 3px 0" type="text">企业详情</el-button>
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
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>一般风险数量</span>
          <el-button style="float: right; padding: 3px 0" type="text">企业详情</el-button>
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
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>低风险数量</span>
          <el-button style="float: right; padding: 3px 0" type="text">企业详情</el-button>
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
  </el-row>
  <el-row >
    <el-col :span="16">
      <el-card class="echert-box-card" :body-style="{height: myHeight}">
        <div slot="header" class="clearfix">
          <span>数据概览</span>
        </div>
        <el-carousel :autoplay="false" indicator-position="outside" :height="myHeight">
          <el-carousel-item>
            <div id="main"></div>
          </el-carousel-item>
          <el-carousel-item >
            <div id="mainRadar"></div>
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="echert-box-card" :body-style="{height: myHeight}">
        <div slot="header" class="clearfix">
          <span>其他企业</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      majorLevel: '',
      largerLevel: '',
      generalLevel: '',
      lowLevel: '',
      noLevel: ''
    }
  },
  computed: {
    myHeight: function () {
      return (window.innerHeight - 368.8) + 'px'
    }
  },
  mounted () {
    this.getEnterpriseRiskCount()
    this.drawLine()
    this.drawRadar()
  },
  methods: {
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
    drawRadar () {
      // 引入 ECharts 主模块
      const echarts = require('echarts/lib/echarts')
      // 引入雷达
      require('echarts/lib/chart/line')
      // 引入提示框和标题组件
      require('echarts/lib/component/tooltip')
      require('echarts/lib/component/title')
      require('echarts/lib/component/legend')
      require('echarts/lib/component/toolbox')
      const myChart = echarts.init(document.getElementById('mainRadar'))
      const option = {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
      myChart.setOption(option)
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
    margin-bottom: 3px;
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
    height: 400px;
    width: 850px;
    margin: 0 auto;
  }
  #mainRadar{
    height: 400px;
    width: 850px;
    margin: 0 auto;
  }
</style>
