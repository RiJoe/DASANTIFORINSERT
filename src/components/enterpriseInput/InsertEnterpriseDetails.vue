<template>
  <div style="background-color: white; height: 99.5%; margin: 1px">
    <!--显示已选择的模板-->
    <div class="enterprise-css">
      <div>
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
      <el-button type="success" @click="upDialogFormVisible">企业信息录入</el-button>
      <el-button type="info" @click="upOtherDialogFormVisible">其他企业录入</el-button>
      </div>
      <div class="upload-button">
      <el-upload
        class="my-upload-demo"
        ref="upload"
        action="http://localhost:7000/save/photo"
        :on-preview="wordHandlePreview"
        :on-remove="wordHandleRemove"
        :on-success="wordHandleSuccess"
        :limit="1"
        :on-exceed="wordHandleExceed"
        :auto-upload="false"
        :file-list="wordFileList">
        <el-button slot="trigger" type="primary" >选择文件</el-button>
        <el-button v-if="enterpriseId !== ''" type="success" @click="submitUpload" :disabled="wordButtonIsDisabled">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button v-if="otherEnterpriseId !== ''" type="info" @click="otherSubmitUpload" :disabled="wordButtonIsDisabled">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-upload>
      </div>
    </div>
      <el-dialog title="企业信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
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
          <el-form-item label="风险值（R）" :label-width="formLabelWidth" prop="riskValue">
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
    <!--显示企业相应的点位信息以供选择-->
    <el-table
      v-if="this.formShow === true"
      :height="tableHeight"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="企业类型"
        width="350">
        <template slot-scope="scope">
          <i class="el-icon-success" v-if="upGreen.indexOf(scope.$index) !== -1" style="color: #67C23A"></i>
          <i class="el-icon-success" v-else ></i>
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
            type="success"
            :disabled="tableIsDistable"
            @click="handleEdit(scope.$index, scope.row)">录入
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--其他模板录入-->
    <div v-else class="other-css">
      <el-form :model="otherForm" :rules="rules" ref="otherForm" label-width="130px" class="demo-otherForm">
        <el-form-item label="评估类别：" prop="valuationCategory">
          <el-input v-model="otherForm.valuationCategory"></el-input>
        </el-form-item>
        <el-form-item label="主要风险类别：" prop="majorRiskCategory">
          <el-input v-model="otherForm.majorRiskCategory"></el-input>
        </el-form-item>
        <el-form-item label="L：" prop="L">
          <el-input type="number" v-model.number="otherForm.L"></el-input>
        </el-form-item>
        <el-form-item label="E：" prop="E">
          <el-input type="number" v-model.number="otherForm.E"></el-input>
        </el-form-item>
        <el-form-item label="C：" prop="C">
          <el-input type="number" v-model.number="otherForm.C"></el-input>
        </el-form-item>
        <el-form-item label="R：" prop="R">
          <el-input type="number" v-model.number="otherForm.R"></el-input>
        </el-form-item >
        <!--<el-form-item label="风险等级：" prop="riskLevel">
          <el-input v-model="otherForm.riskLevel"></el-input>
        </el-form-item>-->
        <el-form-item label="风险等级：" prop="riskLevel">
        <el-select v-model="otherForm.riskLevel" placeholder="请选择风险等级" style="width: 100%">
          <el-option label="重大风险" value="重大风险"></el-option>
          <el-option label="较大风险" value="较大风险"></el-option>
          <el-option label="一般风险" value="一般风险"></el-option>
          <el-option label="低风险" value="低风险"></el-option>
          <el-option label="可接受" value="可接受"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="otherSubmitForm('otherForm')">录入</el-button>
          <el-button @click="otherResetForm('otherForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-table
          :data="otherTableData"
          style="width: 100%">
          <el-table-column
            label="评估类别"
            width="150">
            <template slot-scope="scope">
              <span >{{ scope.row.valuationCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="主要风险类别"
            width="120">
            <template slot-scope="scope">
              <span >{{ scope.row.majorRiskCategory }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="L"
            width="60">
            <template slot-scope="scope">
              <span >{{ scope.row.judgeL }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="E"
            width="60">
            <template slot-scope="scope">
              <span >{{ scope.row.judgeE }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="C"
            width="60">
            <template slot-scope="scope">
              <span >{{ scope.row.judgeC }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="R"
            width="70">
            <template slot-scope="scope">
              <span >{{ scope.row.judgeR }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="风险等级"
            width="90">
            <template slot-scope="scope">
              <span >{{ scope.row.riskLevel }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :title="checkBoxForm.list.influenceFactor" :visible.sync="insertInfluenceFactorDialogFormVisible" width="70%">
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
          <el-button @click="downInsertInfluenceFactorDialogFormVisible">取 消</el-button>
          <el-button type="primary" @click="upInsertInfluenceFactorDialogFormVisible('checkBoxForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--其他信息录入-->
    <el-dialog title="企业信息" :visible.sync="otherDialogFormVisible" :before-close="handleClose">
      <!--录入企业信息-->
      <el-form :model="otherEnterpriseForm" ref="otherEnterpriseForm" :rules="rules" size="mini" >
        <el-form-item label="单位名称" :label-width="formLabelWidth" prop="otherCompanyName">
          <el-input v-model="otherEnterpriseForm.otherCompanyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主要负责人" :label-width="formLabelWidth">
          <el-input v-model="otherEnterpriseForm.otherPrincipal" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="otherEnterpriseForm.otherNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经度" :label-width="formLabelWidth">
          <el-input v-model="otherEnterpriseForm.otherLng" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度" :label-width="formLabelWidth">
          <el-input v-model="otherEnterpriseForm.otherLat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="otherDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="otherFormDialogFormVisible('otherEnterpriseForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableHeight: window.innerHeight - 103,
      // 其他企业的相关信息
      otherEnterpriseId: '',
      formShow: true,
      otherDialogFormVisible: false,
      otherEnterpriseForm: {
        otherCompanyName: '',
        otherPrincipal: '',
        otherNumber: '',
        otherLng: '',
        otherLat: ''
      },
      // 其他模板表单
      otherFormData: {},
      otherForm: {
        valuationCategory: '',
        majorRiskCategory: '',
        L: '',
        E: '',
        C: '',
        R: '',
        riskLevel: ''
      },
      otherTableData: [],
      // word文件上传
      wordButtonIsDisabled: false,
      wordFileList: [],
      upGreen: [],
      enterpriseId: '',
      checkBoxData: [],
      influenceFactorDetails: [],
      fileList: [],
      indexNumber: '',
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
      tableIsDistable: false,
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
        ],
        valuationCategory: [
          {required: true, message: '评估类别不能为空'}
        ],
        majorRiskCategory: [
          {required: true, message: '主要风险类别不能为空'}
        ],
        L: [
          {required: true, message: 'L不能为空'},
          {type: 'number', message: 'L必须为数字值'}
        ],
        E: [
          {required: true, message: 'E不能为空'},
          {type: 'number', message: 'E必须为数字值'}
        ],
        C: [
          {required: true, message: 'C不能为空'},
          {type: 'number', message: 'C必须为数字值'}
        ],
        R: [
          {required: true, message: 'R不能为空'},
          {type: 'number', message: 'R必须为数字值'}
        ],
        riskLevel: [
          { required: true, message: '请选择风险等级', trigger: 'change' }
        ],
        otherCompanyName: [
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
    // 录入其他信息按钮
    upOtherDialogFormVisible () {
      // 关闭弹窗
      this.otherDialogFormVisible = true
      // 把模板的方式录入的table设为false进行关闭，把其他录入显示出来
      this.formShow = false
      // 把企业id置未空
      this.otherEnterpriseId = ''
      // 把其他录入成功进行数据展示的table清空
      this.otherTableData = []
      // 把文档上传的数据置为空
      this.wordFileList = []
      // 把其他企业信息表单置空
      this.otherEnterpriseForm = {}
      // 把其他企业详细信息置空
      this.otherForm = {}
    },
    // 保存其他企业信息
    otherFormDialogFormVisible (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const {data: res} = await this.$http.post('/save/other/enterprise', {
            'otherCompanyName': this.otherEnterpriseForm.otherCompanyName,
            'otherPrincipal': this.otherEnterpriseForm.otherPrincipal,
            'otherNumber': this.otherEnterpriseForm.otherNumber,
            'otherLng': this.otherEnterpriseForm.otherLng,
            'otherLat': this.otherEnterpriseForm.otherLat
          })
          if (res.result === 'SUCCESS') {
            this.otherEnterpriseId = res.data
            this.$message.success('录入成功！')
            this.otherDialogFormVisible = false
          } else {
            this.$message.error('录入失败！请重新录入')
          }
        } else {
          return false
        }
      })
    },
    handleClose (done) {
      if (this.enterpriseId === '') {
        done()
      } else {
        this.$message.error('窗口不能被关闭，请检查模板是否已确认')
      }
    },
    // 其他企业详细信息上传
    otherSubmitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.otherEnterpriseId !== '') {
            const {data: res} = await this.$http.post('/save/other/influence/details', {
              otherEnterpriseId: this.otherEnterpriseId,
              valuationCategory: this.otherForm.valuationCategory,
              majorRiskCategory: this.otherForm.majorRiskCategory,
              judgeL: this.otherForm.L,
              judgeE: this.otherForm.E,
              judgeC: this.otherForm.C,
              judgeR: this.otherForm.R,
              riskLevel: this.otherForm.riskLevel
            })
            if (res.result === 'SUCCESS') {
              this.$message.success('录入成功')
              this.otherTableData.push(res.data)
            }
          } else {
            this.$message.error('请录入其他企业信息再进行录入')
          }
        } else {
          this.$message.warning('请输入后在点击录入')
          return false
        }
      })
    },
    // 其他表企业的表单重置清除表单
    otherResetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // word文档上传
    async wordHandleSuccess (response) {
      if (response.result === 'SUCCESS') {
        if (this.enterpriseId !== '') {
          const {data: res} = await this.$http.post('/save/word/url', {
            enterpriseId: this.enterpriseId,
            wordUrl: response.data
          })
          if (res.result === 'SUCCESS') {
            this.$message.success('上传成功')
          } else {
            this.$message.error('上传失败！请重新上传')
          }
        } else if (this.otherEnterpriseId !== '') {
          const {data: res} = await this.$http.post('/save/other/word/url', {
            otherEnterpriseId: this.otherEnterpriseId,
            otherWordUrl: response.data
          })
          if (res.result === 'SUCCESS') {
            this.$message.success('上传成功')
          } else {
            this.$message.error('上传失败！请重新上传')
          }
        }
      } else {
        this.$message.error('上传失败！请重新上传')
      }
    },
    otherSubmitUpload () {
      this.$refs.upload.submit()
      console.log(this.wordFileList)
      if (this.wordFileList.length > 0) {
        this.$message.warning('相应文档已上传！')
      }
    },
    submitUpload () {
      this.$refs.upload.submit()
      if (this.wordFileList.length > 0) {
        this.$message.warning('相应文档已上传！')
      }
    },
    wordHandlePreview (file) {
      console.log(file)
    },
    wordHandleRemove (file, fileList) {
      console.log(file, fileList)
    },
    wordHandleExceed (files, fileList) {
      this.$message.warning(`每家企业只能选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 保存风险因素情况
    async upInsertInfluenceFactorDialogFormVisible () {
      // 遍历选中的复选框用来和图片封装的图片对象进行比较奥
      if (this.checkBoxForm.type.length > 0) {
        this.checkBoxForm.type.forEach((item, index) => {
          // 获取相应的分数
          let score = ''
          this.checkBoxForm.list.tableDetailsList.forEach((scoreItem, socreIndex) => {
            if (item === scoreItem.determineFactor) {
              score = scoreItem.score
            }
          })
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
          this.influenceFactorDetails.push({'enterpriseId': this.enterpriseId, 'categoryId': this.checkBoxForm.list.categoryId, 'influenceFactor': this.checkBoxForm.list.influenceFactor, 'determineFactor': item, 'score': score, 'photo': photoStr})
        })
        // 把风险详情添加到数组里发送给后台
        const {data: res} = await this.$http.post('/save/influence/factor/details', {
          'influenceFactorDetailsList': this.influenceFactorDetails
        })
        if (res.result === 'SUCCESS') {
          this.$message.success('录入成功！')
          // 上传后的数组置空
          this.influenceFactorDetails = []
          // 把图片上传成功的数组置空
          this.checkBoxData = []
          this.fileList = []
          // 把选中中的数组置空
          this.checkBoxForm.type = []
          // 把table行号加进数组
          this.upGreen.push(this.indexNumber)
          // 关闭弹窗
          this.insertInfluenceFactorDialogFormVisible = false
        } else {
          this.$message.error('录入失败！请重新录入！')
        }
      } else {
        this.$message.error('请选择后在提交！')
        return false
      }
    },
    // 选项取消按钮
    downInsertInfluenceFactorDialogFormVisible () {
      // 把图片上传成功的数组置空
      this.checkBoxData = []
      this.fileList = []
      // 把选中中的数组置空
      this.checkBoxForm.type = []
      this.insertInfluenceFactorDialogFormVisible = false
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
            // 把上传文件的按钮打开
            this.wordButtonIsDisabled = false
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
      if (this.upGreen.indexOf(index) !== -1) {
        this.$message.warning('选项只能入录一次！该选项已被录入！')
        return false
      }
      if (this.enterpriseId !== '') {
        this.insertInfluenceFactorDialogFormVisible = true
        this.checkBoxForm.list = row
        this.indexNumber = index
      } else {
        this.$message.error('请先录入企业信息后再进行录入')
      }
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
              // 把选中的并成功上传的table index置空
              this.upGreen = []
              // 把已经成功上传的文档置空
              this.wordFileList = []
              // 把enterprId设为空
              this.enterpriseId = ''
              // 把其他模板展示的table变为空
              this.otherTableData = []
              this.formShow = true
              // 其他企业设为空，避免上传按钮显示
              this.otherEnterpriseId = ''
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
  display: flex;
  justify-content: space-between;
  margin: 1px;
}
.select-button{
display: flex;
}
.checkbox-upload{
  display: flex;
  justify-content: space-between;
}
.my-upload-demo{
  margin-right: 8px;
}
.upload-button{
  display: flex;
}
.demo-otherForm{
  width: 50%;
}
.other-css{
  display: flex;
  margin-top: 10px;
}
.box-card{
  width: 43.3%;
  position: absolute;
  height: 52%;
}
</style>
