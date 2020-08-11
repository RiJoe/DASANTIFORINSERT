<template>
  <div class="input-css">
    <el-steps :active="1" finish-status="success" simple style="margin-top: 1px">
      <el-step title="企业信息"></el-step>
      <el-step title="事故后果"></el-step>
      <el-step title="事故可能性"></el-step>
      <el-step title="事故/人群暴露"></el-step>
    </el-steps>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动性质:">
        <el-checkbox-group v-model="checkList">
          <div>
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :disabled="true"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div>
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div>
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
          <el-checkbox label="禁用" disabled></el-checkbox>
          <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'InputEnterpriseMessage',
  data () {
    return {
      form: {
      },
      checkList: ['选中且禁用', '复选框 A'],
      fileList: []
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>
  .el-checkbox-group{
    display: flex;
  }
</style>
