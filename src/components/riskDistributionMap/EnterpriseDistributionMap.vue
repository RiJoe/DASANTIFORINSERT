<template>
  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    <bm-marker :position="{lng: 116.404,lat: 39.915}" :icon="{url: 'http://localhost:7000/uploadFile/orange1.png',size: {width: 30, height: 30}}">
    </bm-marker>
  </baidu-map>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      center: '',
      zoom: 3,
      enterpriseList: []
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
    // 获取所有企业
    async getAllEnterprise () {
      const {data: res} = await this.$http.get('/get/all/enterprise')
      if (res.result === 'SUCCESS') {
        this.enterpriseList = res.data
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
