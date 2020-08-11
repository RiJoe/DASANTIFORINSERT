<template>
    <div>
      <el-steps :active="0" finish-status="success" simple style="margin-top: 1px">
        <el-step title="企业信息"></el-step>
        <el-step title="事故后果"></el-step>
        <el-step title="事故可能性"></el-step>
        <el-step title="事故/人群暴露"></el-step>
      </el-steps>
      <el-form ref="form" :model="form" :rules="rules" >
        <el-form-item class="select-form" label="评估类型表格：" label-width="120px" prop="region">
          <el-select v-model="form.region" filterable placeholder="请选择" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="form-item-css">
        <el-form-item label="单位名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="主要负责人：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        </div>
        <div class="form-item-css">
        <el-form-item label="填报人：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="填报人联系电话：" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="经度：" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        </div>
        <div class="form-item-css">
        <el-form-item label="纬度：" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="全员人数：" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="风险值：" >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-css">
          <el-form-item label="措施：" >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="主要危险源：" >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="主要风险名称：" >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="form-item-button">
        <el-form-item >
          <el-button type="primary" @click="onSubmit" autofocus>提交</el-button>
        </el-form-item>
        </div>
      </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      form: {
        region: ''
      },
      rules: {
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!', this.form.region)
    }
  }
}
</script>

<style scoped>
.form-item-button{
  display: flex;
  justify-content: center;
}
.form-item-css{
  display: flex;
  justify-content: space-around;
}
.el-form-item{
  margin-top: 3px;
  width: 400px;
}
/*.select-form{
  display: flex;
  justify-content: left;
}*/
</style>
