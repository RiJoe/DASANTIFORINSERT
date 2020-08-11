<template>
  <div>
    <div>
      <el-steps :active="1" finish-status="success" simple style="margin-top: 1px">
        <el-step title="事故后果"></el-step>
        <el-step title="事故可能性"></el-step>
        <el-step title="事故/人群暴露"></el-step>
      </el-steps>
    </div>
    <el-form ref="form" :model="sizeForm" label-width="100px">
      <div class="form-css">
        <el-form-item label="影响因素：">
          <el-input v-model="sizeForm.influenceFactor"></el-input>
        </el-form-item>
        <el-form-item label="判定要素：">
          <el-input v-model="sizeForm.determineFactor"></el-input>
        </el-form-item>
        <el-form-item label="赋分标准：">
          <el-input v-model="sizeForm.score"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" autofocus>提交</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-card class="box-card">
        <div v-for="(item,index) in this.formList" :key="index" class="text item">
          影响因素：{{item.influenceFactor}}
          判定要素：{{item.determineFactor}}
          赋分标准：{{item.score}}
        </div>
        <el-button type="primary" class="button" @click="nextStep" >下一步</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sizeForm: {
        tableId: '',
        tableName: '',
        categoryId: 1,
        influenceFactor: '',
        determineFactor: '',
        score: '',
        photo: ''
      }
    }
  }
}
</script>

<style scoped>
  .form-css{
    float: left;
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 2px 0;
  }

  .box-card {
    width: 480px;
    float: right;
    margin-right: 20px;
  }
</style>
