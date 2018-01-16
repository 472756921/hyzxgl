<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="storeFlag" :title="store" @on-ok="optai">
      <div class="com">
        岗位名称：<Input v-model="job.postName" placeholder="岗位名称" style="width: 300px"/>
      </div>
      <div class="com">
        岗位职责：<Input v-model="job.postDuties" placeholder="岗位职责" style="width: 300px"/>
      </div>
      <div class="com">
        工作流程：<Input v-model="job.workflow" placeholder="工作流程" style="width: 300px"/>
      </div>
      <div class="com">
        行为绩效与评分：<Input v-model="job.achievements" placeholder="行为绩效与评分" style="width: 264px"/>
      </div>
      <div class="com">
        技术考核：<Input v-model="job.technicalExamination" placeholder="技术考核" style="width: 300px"/>
      </div>
      <div class="com">
        员工等级：<Input v-model="job.classes" placeholder="员工等级" style="width: 300px"/>
      </div>
      <div class="com">
        员工考勤：
        <Select v-model="job.kq" style="width:296px">
          <Option value="是" >是</Option>
          <Option value="否" >否</Option>
        </Select>
      </div>
      <div class="com">
        员工数据排名：
        <Select v-model="job.dataRankings" style="width:274px">
          <Option value="单月现金" >单月现金</Option>
          <Option value="多月现金" >多月现金</Option>
          <Option value="客流" >客流</Option>
          <Option value="实操" >实操</Option>
        </Select>
      </div>
      <div class="com" v-if="job.dataRankings == '多月现金'">
        多月现金：<Input v-model="job.multiMonthCash" placeholder="统计月单位" style="width: 300px" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/"/>
      </div>
      <div class="com">
        入股金额：<Input v-model="job.shareAmount" placeholder="入股金额" style="width: 300px" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/"/>
      </div>
      <div class="com">
        分红管理：<Input v-model="job.dividendManagement" placeholder="分红管理" style="width: 300px"/>
      </div>
      <div class="com">
        股权性质：
        <Select v-model="job.natureOfEquity" style="width:297px">
          <Option value="干股" >干股</Option>
          <Option value="实股" >实股</Option>
        </Select>
      </div>
      <br/>
      <br/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findPostList, findPostsave, findPostedit} from '../../interface';

  export default {
    name: 'e_index',
    created() {
      this.getList(1);
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        job: {
          id : '',
          storeId: '',
          postName: '',
          postDuties: '',
          workflow: '',
          achievements: '',
          technicalExamination: '',
          checkWorkAttendance: '',

          multiMonthCash: '',
          classes: '',
          shareAmount: '',
          dividendManagement: '',
          natureOfEquity: '',
          dataRankings: '',
          kq: '',
        },
        columns: [
          {
            title: '序号',
            key: 'id',
          },
          {
            title: '岗位名称',
            key: 'postName',
          },
          {
            title: '职责',
            key: 'postDuties',
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.mannger(params.row)
                  }
                }
              }, '修改');
            }
          }
        ],
        data: [],
      };
    },
    methods: {
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findPostList()+"?id="+this.$route.params.id+"&page="+page+"&pageSize=30",
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
      },
      optai() {
        if(this.job.postName == '' || this.job.postDuties == '' || this.job.workflow == '' || this.job.achievements == '' || this.job.technicalExamination == ''){
          this.$Message.warning('请完整填写内容');
          return false;
        }
        this.job.storeId = this.$route.params.id;
        let URL = findPostsave();
        if( this.store == '修改') {
          URL = findPostedit();
        };
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.job,
          url: URL,
        }).then((res) => {
          this.$Message.success('操作成功');
        }).catch((error) => {
        });
      },
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.job = {
          id : '',
            postName: '',
            postDuties: '',
            workflow: '',
            achievements: '',
            technicalExamination: '',
            checkWorkAttendance: '',
        };
      },
      ok() {},
      mannger(data) {
        this.storeFlag = true;
        this.store = '修改';
        this.job = data;
      },
    }
  };
</script>

<style scoped>
  .com{
    margin: 10px 0;
  }
</style>
