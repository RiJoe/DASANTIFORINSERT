<template>
  <div>
    <div>
      <el-steps :active="active" finish-status="success" simple style="margin-top: 1px">
        <el-step title="事故后果"></el-step>
        <el-step title="事故可能性"></el-step>
        <el-step title="事故/人群暴露"></el-step>
      </el-steps>
    </div>
    <div>
      <!--<el-button  type="primary"  @click="dialogFormVisible = true" >点击按钮输入模板名称</el-button>-->
      <el-dialog title="录入表格模板" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item label="表格名称" :label-width="formLabelWidth" prop="tableName">
            <el-input v-model="form.tableName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="downDialogFormVisible">取 消</el-button>
            <el-button type="primary" @click="upDialogFormVisible('form')">确 定</el-button>
          </el-form-item>
        </el-form>
        <!--<div slot="footer" class="dialog-footer">
          <el-button @click="downDialogFormVisible">取 消</el-button>
          <el-button type="primary" @click="upDialogFormVisible">确 定</el-button>
        </div>-->
      </el-dialog>
    </div>
    <el-form :model="ruleForm" :rules="rules" :disabled="ruleForm.isDisabled" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="influenceFactor-css">
      <el-form-item label="影响因素：" prop="influenceFactor">
        <el-input v-model="ruleForm.influenceFactor"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitInfluenceFactor('ruleForm')">保存</el-button>
      </el-form-item>
      </div>
    </el-form>
    <el-form ref="sizeForm" :model="sizeForm" :disabled="sizeForm.isDisabled" label-width="100px" :rules="rules">
      <div class="form-css">
        <el-form-item label="判定要素：" prop="determineFactor">
          <el-input v-model="sizeForm.determineFactor"></el-input>
        </el-form-item>
        <el-form-item label="赋分标准：" prop="score">
          <el-input v-model.number="sizeForm.score" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('sizeForm')" autofocus>提交</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <el-card class="box-card">
        <h3>模板名称：{{sizeForm.tableName}}</h3>
        <div v-for="(item,index) in this.formList" :key="index" class="text item">
          影响因素：{{item.influenceFactor}}
          判定要素：{{item.determineFactor}}
          赋分标准：{{item.score}}
        </div>
        <el-button type="primary" class="button" :disabled="isDisabled" @click="nextStep" >{{this.step}}</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDisabled: true,
      step: '下一步',
      active: 0,
      dialogFormVisible: true,
      form: {
        tableName: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      ruleForm: {
        influenceFactor: '',
        isDisabled: false
      },
      sizeForm: {
        tableId: '',
        tableName: '',
        categoryId: 1,
        influenceFactor: '',
        determineFactor: '',
        score: '',
        photo: '',
        isDisabled: true
      },
      formList: [],
      rules: {
        influenceFactor: [
          {required: true, message: '请输入影响因素', trigger: 'blur'}
        ],
        tableName: [
          {required: true, message: '请输入表名', trigger: 'blur'}
        ],
        determineFactor: [
          {required: true, message: '请输入判定要素', trigger: 'blur'}
        ],
        score: [
          {required: true, message: '请输入分数', trigger: 'blur'},
          {type: 'number', message: '分数必须为数字值'}
        ]
      }
    }
  },
  methods: {
    submitInfluenceFactor (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const {data: res} = await this.$http.post('/insert/table/influence', {
            tableId: this.sizeForm.tableId,
            tableName: this.sizeForm.tableName,
            categoryId: this.sizeForm.categoryId,
            influenceFactor: this.ruleForm.influenceFactor
          })
          console.log(res)
          if (res.result === 'SUCCESS') {
            // this.sizeForm.influenceFactor = res.influenceFactor
            this.sizeForm.isDisabled = false
            this.$message.success('保存成功')
          }
        } else {
          this.$message.error('请输入影响因素在保存')
          return false
        }
      })
    },
    // 下一步录入事故可能性
    nextStep () {
      // 清空卡片上的数据
      this.formList.splice(0, this.formList.length)
      // 解锁保存按钮
      this.ruleForm.isDisabled = false
      this.sizeForm.isDisabled = true
      this.isDisabled = true
      // 更改影响因素的值
      if (this.sizeForm.categoryId++ === 3) {
        this.isDisabled = false
        this.step = '完成'
      }
      if (this.active++ > 2) {
        this.$message.success('成功录入改模板信息！')
        this.$router.push({path: '/tableinsert'})
        location.reload()
      }
    },
    // 关闭弹框，跳转到指定页面
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.$router.push({path: '/inputriskmessage'})
        })
        .catch(_ => {
        })
    },
    // 取消弹框，调准到指定页面
    downDialogFormVisible () {
      this.dialogFormVisible = false
      this.$router.push({path: '/inputriskmessage'})
    },
    // 保存模板名称
    upDialogFormVisible (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 发送请求返回模板id
          const {data: res} = await this.$http.post('/insert/table', {
            tableName: this.form.tableName
          })
          if (res.result === 'SUCCESS') {
            // 给表单赋值进行录入数据库
            this.sizeForm.tableId = res.data.id
            this.sizeForm.tableName = res.data.tableName
            this.$message.success('录入成功！')
            // 成功弹框关闭
            this.dialogFormVisible = false
          } else {
            this.$message.error('录入失败，请重新提交')
            // 失败弹框不关闭
            this.dialogFormVisible = true
          }
        } else {
          this.$message.error('请输入模板名称在提交')
          return false
        }
      })
    },
    // 保存模板详细信息
    onSubmit (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const {data: res} = await this.$http.post('/insert/table/details', {
            tableId: this.sizeForm.tableId,
            tableName: this.sizeForm.tableName,
            categoryId: this.sizeForm.categoryId,
            influenceFactor: this.ruleForm.influenceFactor,
            determineFactor: this.sizeForm.determineFactor,
            score: this.sizeForm.score,
            photo: this.sizeForm.determineFactor + '图片'
          })
          if (res.result === 'SUCCESS') {
            // 给卡片的list赋值进行遍历展示已录入选项
            this.isDisabled = false
            // this.ruleForm.isDisabled = true
            this.formList.push(res.data)
            this.$message.success('录入成功！')
          } else {
            this.$message.error('录入失败，请重新提交')
          }
        } else {
          this.$message.error('请输入相关信息在提交')
          return false
        }
      })
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
.influenceFactor-css{
  display: flex;
}
</style>
