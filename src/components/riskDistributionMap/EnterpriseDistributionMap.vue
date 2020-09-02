<template>
  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" v-loading="loading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <bm-marker :position="{lng:parseFloat(item.lng),lat:parseFloat(item.lat)}" :title="item.companyName" :icon="{url: item.riskDeterminationTable.iconUrl,size: {width: 30, height: 30}}" @click="infoWindowOpen(item)" v-for="( item, index ) in this.enterpriseList" :key="index">
    </bm-marker>
    <bm-info-window :position="position" :show="show" :title="enterpriseInfo.companyName" @close="infoWindowClose" @open="myInfoWindowOpen"  >
      <ul>
        <li>单位名称：{{enterpriseInfo.companyName}}</li>
        <li>负责人：{{enterpriseInfo.principal}}</li>
        <li>填报人：{{enterpriseInfo.informant}}</li>
        <li>填报人电话：{{enterpriseInfo.informantNumber}}</li>
        <li>企业员工总数：{{enterpriseInfo.totalNumber}}</li>
        <li>单位地址：{{enterpriseInfo.address}}</li>
        <li>主要危险源：{{enterpriseInfo.majorDanger}}</li>
        <li>主要风险名称：{{enterpriseInfo.majorRiskName}}</li>
        <li>风险值：{{enterpriseInfo.riskValue}}</li>
        <li>风险等级：{{riskDetails.riskLevel}}</li>
        <li>措施：{{riskDetails.riskMeasure}}</li>
      </ul>
    </bm-info-window>
  </baidu-map>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      center: '',
      zoom: 3,
      enterpriseList: [],
      show: false,
      position: {},
      enterpriseInfo: {},
      riskDetails: {}
    }
  },
  mounted () {
    this.getAllEnterprise()
  },
  methods: {
    handler ({BMap, map}) {
      map.enableScrollWheelZoom(true)
      map.setMapStyle({style: 'normal'})
      this.center = '深圳观湖街道办'
      this.zoom = 13
    },
    infoWindowOpen (item) {
      this.show = true
      this.position = {lng: parseFloat(item.lng), lat: parseFloat(item.lat)}
      this.enterpriseInfo = item
      this.riskDetails = item.riskDeterminationTable
    },
    infoWindowClose () {
      this.show = false
    },
    myInfoWindowOpen () {
      this.show = true
    },
    // 获取所有企业
    async getAllEnterprise () {
      const {data: res} = await this.$http.get('/get/all/enterprise')
      if (res.result === 'SUCCESS') {
        this.enterpriseList = res.data
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
