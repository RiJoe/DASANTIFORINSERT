<template>
  <div>
    <!--显示已选择的模板-->
    <div class="enterprise-css">
      <el-select v-model="formWorkForm.region" disabled placeholder="模板" style="width: 350px">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.tableName"
          :value="item.id">
        </el-option>
      </el-select>
      <!-- Form -->
      <!--企业信息录入-->
      <el-button type="primary" @click="upDialogFormVisible">企业信息录入</el-button>
      <el-dialog title="企业信息" :visible.sync="dialogFormVisible">
        <!--选择企业对应录入模板-->
        <el-form :model="formWorkForm" :disabled="formWorkForm.isDisabled" ref="formWorkForm" :rules="rules"
                 size="mini">
          <div class="select-button">
            <el-form-item label="模板选择" :label-width="formLabelWidth" prop="region">
              <el-select v-model="formWorkForm.region" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.tableName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="selectFormWork('formWorkForm')">确 定</el-button>
            </el-form-item>
          </div>
        </el-form>
        <!--录入企业信息-->
        <el-form :model="form" ref="form" :rules="rules" size="mini" :disabled="form.isDisabled">
          <el-form-item label="单位名称" :label-width="formLabelWidth" prop="companyName">
            <el-input v-model="form.companyName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主要负责人" :label-width="formLabelWidth">
            <el-input v-model="form.principal" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="填报人" :label-width="formLabelWidth">
            <el-input v-model="form.informant" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="填报人联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.informantNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="经度" :label-width="formLabelWidth">
            <el-input v-model="form.lng" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" :label-width="formLabelWidth">
            <el-input v-model="form.lat" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="全员人数" :label-width="formLabelWidth">
            <el-input v-model="form.totalNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="风险值" :label-width="formLabelWidth" prop="riskValue">
            <el-input v-model.number="form.riskValue" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="措施" :label-width="formLabelWidth">
            <el-input v-model="form.measure" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主要危险源" :label-width="formLabelWidth">
            <el-input v-model="form.majorDanger" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主要风险名称" :label-width="formLabelWidth">
            <el-input v-model="form.majorRiskName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="enterpriseFormDialogFormVisible('form')">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--显示企业相应的点位信息以供选择-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="企业类型"
        width="300">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.tableName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类别"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.categoryId === 1">事故后果</span>
          <span style="margin-left: 10px" v-if="scope.row.categoryId === 2">可能性</span>
          <span style="margin-left: 10px" v-if="scope.row.categoryId === 3">暴露程度</span>
        </template>
      </el-table-column>
      <el-table-column
        label="影响因素"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.influenceFactor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="tableIsDistable"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="checkBoxForm.list.influenceFactor" :visible.sync="insertInfluenceFactorDialogFormVisible">
      <el-form :model="checkBoxForm" :rules="rules">
        <el-form-item>
          <el-checkbox-group v-model="checkBoxForm.type">
            <div class="checkbox-upload" v-for="(item,index) in this.checkBoxForm.list.tableDetailsList" :key="index">
              <el-checkbox :label="item.determineFactor"></el-checkbox>
              <el-upload
                class="upload-demo"
                action="http://localhost:7000/save/photo"
                :on-preview="handlePreview"
                :on-success="function (response, file, fileList) {return handleSuccess(response, file, fileList, item.photo)}"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">图片上传</el-button>
              </el-upload>
            </div>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="insertInfluenceFactorDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="upInsertInfluenceFactorDialogFormVisible('checkBoxForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      enterpriseId: '',
      checkBoxData: [],
      influenceFactorDetails: [],
      fileList: [],
      // 复选框表单
      checkBoxForm: {
        checkList: [],
        list: {},
        type: []
      },
      // 影响因素选项录入弹框
      insertInfluenceFactorDialogFormVisible: false,
      // 模板表单
      formWorkForm: {
        region: '',
        isDisabled: false
      },
      tableData: [],
      tableIsDistable: true,
      dialogFormVisible: false,
      // 企业信息表单
      form: {
        isDisabled: true,
        companyName: '',
        principal: '',
        address: '',
        informant: '',
        informantNumber: '',
        lng: '',
        lat: '',
        totalNumber: '',
        riskValue: '',
        measure: '',
        majorDanger: '',
        majorRiskName: ''
      },
      formLabelWidth: '120px',
      // 模板选项
      options: [],
      value: '',
      // 表单规则
      rules: {
        region: [
          { required: true, message: '请选择相应模板', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个选项', trigger: 'change' }
        ],
        riskValue: [
          {required: true, message: '风险值不能为空'},
          {type: 'number', message: '风险值必须为数字值'}
        ],
        companyName: [
          {required: true, message: '单位名称不能为空'}
        ]
      }
    }
  },
  mounted () {
    this.getAllFormWork()
  },
  watch: {
  },
  methods: {
    // 保存风险因素情况
    async upInsertInfluenceFactorDialogFormVisible (formName) {
      // 遍历选中的复选框用来和图片封装的图片对象进行比较奥
      if (this.checkBoxForm.type.length > 0) {
        this.checkBoxForm.type.forEach((item, index) => {
          // 拼接选中的图片地址
          let photoStr = ''
          this.checkBoxData.forEach((photoItem, photoIndex) => {
            // 如果选中的复选框和图片对象的名称一样则进行拼装
            if (item + '图片' === photoItem.determineFactor) {
              photoStr = photoItem.photo + ',' + photoStr
            }
          })
          // 把拼装好的图片地址的最后一个逗号去掉
          if (photoStr.length > 0) photoStr = photoStr.substr(0, photoStr.length - 1)
          // 把风险详情添加到数组里
          this.influenceFactorDetails.push({enterpriseId: this.enterpriseId, categoryId: this.checkBoxForm.list.categoryId, determineFactor: item, photo: photoStr})
        })
        // 把风险详情添加到数组里发送给后台
        const {data: res} = await this.$http.post('/save/influence/factor/details', {
          influenceFactorDetailsList: this.influenceFactorDetails
        })
        console.log(res)
        this.insertInfluenceFactorDialogFormVisible = false
      } else {
        this.$message.error('请选择后在提交！')
        return false
      }
    },
    // 企业信息录入
    enterpriseFormDialogFormVisible (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const {data: res} = await this.$http.post('/save/enterprise', {
            companyType: this.formWorkForm.region,
            companyName: this.form.companyName,
            principal: this.form.principal,
            address: this.form.address,
            informant: this.form.informant,
            informantNumber: this.form.informantNumber,
            lng: this.form.lng,
            lat: this.form.lat,
            totalNumber: this.form.totalNumber,
            riskValue: this.form.riskValue,
            measure: this.form.measure,
            majorDanger: this.form.majorDanger,
            majorRiskName: this.form.majorRiskName
          })
          if (res.result === 'SUCCESS') {
            this.$message.success('保存成功')
            // 保存返回的企业id
            this.enterpriseId = res.data
            // 把table的编辑按钮解禁
            this.tableIsDistable = false
            this.dialogFormVisible = false
          } else {
            this.$message.error('保存失败，请重试')
          }
        } else {
          this.$message.warning('请检查输入是否已输入或格式是否正确')
          return false
        }
      })
    },
    handleSuccess (response, file, fileList, photo) {
      // 把上传的图片通过对象封装起来加进数组
      this.checkBoxData.push({determineFactor: photo, photo: response.data})
    },
    handleRemove (file, fileList) {
      // 通过删除的地址和对象的地址进行比较，通过下标进行删除
      this.checkBoxData.forEach((item, index) => {
        if (file.response.data === item.photo) {
          this.checkBoxData.splice(index, 1)
        }
      })
    },
    handlePreview (file) {
      console.log(file)
    },
    // 打开弹窗按钮
    upDialogFormVisible () {
      // 打开弹窗
      this.dialogFormVisible = true
      // 把模板选择设为可用
      // this.formWorkForm.isDisabled = false
      // 把企业信息录入设为禁用状态
      this.form.isDisabled = true
    },
    handleEdit (index, row) {
      this.insertInfluenceFactorDialogFormVisible = true
      this.checkBoxForm.list = row
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 选择模板，并进项规则限制
    selectFormWork (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('请录入下面相关企业信息再进行相关详细信息录入，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            // 通过模板id获取模板信息
            const {data: res} = await this.$http.get('/get/table/by/id', {
              params: {
                tableId: this.formWorkForm.region
              }
            })
            // 获取成功此模板选择功能不可用，解锁企业信息录入功能
            if (res.result === 'SUCCESS') {
              this.$message({
                type: 'success',
                message: '获取成功'
              })
              // 把模板信息添加到table
              this.tableData = res.data
              // 把企业信息录入表单设为不禁用
              this.form.isDisabled = false
              // 把模板选择设为禁用状态
              // this.formWorkForm.isDisabled = true
            } else {
              this.$message({
                type: 'error',
                message: '获取失败，请重新选择'
              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '请重新选择'
            })
          })
          // alert(this.formWorkForm.region)
        } else {
          this.$message.warning('请选择相应模板')
          return false
        }
      })
    },
    // 发送请求获取所有模板
    async getAllFormWork () {
      const {data: res} = await this.$http.get('/get/all/formwork')
      if (res.result === 'SUCCESS') {
        this.options = res.data
      }
    }
  }
}
</script>

<style scoped>
.enterprise-css{
  float: left;
}
.select-button{
display: flex;
}
.checkbox-upload{
  display: flex;
  justify-content: space-between;
}
</style>
