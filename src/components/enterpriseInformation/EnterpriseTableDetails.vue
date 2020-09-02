<template>
    <div class="mytable">
      <h3>2020年{{this.$route.query.row.companyName}}风险详情</h3>
      <table border="1" cellspacing="0" align="center">
        <tr>
          <th>类别</th>
          <th>影响因素</th>
          <th>判定要素</th>
          <th>赋分标准</th>
          <th>具体情况</th>
          <th>现场照片</th>
        </tr>
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
      </table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tableDetails: [],
      tableRow: 0,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  },
  mounted () {
    this.getTableDetailsByTableId()
  },
  methods: {
    async getTableDetailsByTableId () {
      const {data: res} = await this.$http.get('/get/table/details/by/id', {
        params: {
          'tableId': this.$route.query.row.companyType,
          'enterpriseId': this.$route.query.row.id
        }
      })
      if (res.result === 'SUCCESS') {
        this.tableDetails = res.data
        this.tableDetails.forEach((item, index) => {
          item.photo = (item.photo || '').split(',')
          console.log(item.photo)
        })
        // console.log(this.tableDetails)
      }
    }
  }
}
</script>

<style scoped>
  table{
    border-collapse: collapse;
    background: white;
  }
  .mytable{
    padding-bottom: 40px;
  }
</style>
