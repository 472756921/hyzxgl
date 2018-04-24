<template>
  <div class="sa5" >
    <br>
    <div class="content" v-if="data1.typeOfBonus==1">
      <h3>按客流奖励<span class="notice">{{data1.typeOfBonus == 1?'已启用':'未启用'}}</span></h3>
      <div>
        <h4>1.单日客流奖励</h4>
        单日客流：<Input v-model="data1.singleDayPassengerFlow" placeholder="单日客流" size="small" class="Input"/>
        奖励金额：<Input v-model="data1.oneDayPassengerFlowAward" placeholder="奖励金额" size="small" class="Input"/>
        <Button class="btn" size="small" type="success" @click="savecomplaint">保存</Button>
        <h4>2.累计客流奖励</h4>
        累计客流：<Input v-model="data1.accumulativePassengerFlow" placeholder="累计客流" size="small" class="Input"/>
        奖励金额：<Input v-model="data1.accumulativePassengerFlowAward" placeholder="奖励金额" size="small" class="Input"/>
        <Button class="btn" size="small" type="success" @click="savecomplaint">保存</Button>

        <h4>3.累计客流区间
          <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="accumulativeFlag=true">新增</Button>
        </h4>
        <vtable :sdata="data1.data" :stype="accumulativedataType" @Monitor="takeMonitor" ></vtable>
      </div>
    </div>
    <Modal  v-model="accumulativeFlag" title="新增" @on-ok="saveAccumulativePassengerFlow">
      <span class="text">低限：</span>
      <Input v-model="accumulativeadd.lowLimit" @on-keyup="accumulativeadd.lowLimit=check(accumulativeadd.lowLimit)" placeholder="奖金总额" style="width: 300px"/>
      <br>
      <br>
      <span class="text">高限：</span>
      <Input v-model="accumulativeadd.highLimit" @on-keyup="accumulativeadd.highLimit=check(accumulativeadd.highLimit)" placeholder="奖金总额" style="width: 300px"/>
      <br>
      <br>
      <span class="text">金额：</span>
      <Input v-model="accumulativeadd.amountOfReward" @on-keyup="accumulativeadd.amountOfReward=check2(accumulativeadd.amountOfReward)" placeholder="奖金总额" style="width: 300px"/>
      <br/>
      <br/>
    </Modal>

    <div class="content" v-if="data1.typeOfBonus==2">
      <h3>按现金业绩奖励 <span>{{data1.cashType}}</span> <span class="notice">{{data2.typeOfBonus == 2?'已启用':'未启用'}}</span>
        <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="cashRewarFlag=true">新增</Button>
        <vtable :sdata="data1.data" :stype="CashRewardType" @Monitor="takeMonitor" ></vtable>

      </h3>
    </div>
    <Modal  v-model="cashRewarFlag" title="新增" @on-ok="saveCashReward">
      <span class="text">低限：</span>
      <Input v-model="cashRewardadd.lowLimit" @on-keyup="cashRewardadd.lowLimit=check(cashRewardadd.lowLimit)" placeholder="低限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">高限：</span>
      <Input v-model="cashRewardadd.highLimit" @on-keyup="cashRewardadd.highLimit=check(cashRewardadd.highLimit)" placeholder="高限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">金额：</span>
      <Input v-model="cashRewardadd.amountOfReward" @on-keyup="cashRewardadd.amountOfReward=check2(cashRewardadd.amountOfReward)" placeholder="奖金总额" style="width: 300px"/>
      <br/>
      <br/>
    </Modal>
    <div class="content" v-if="data1.typeOfBonus==3">
      <h3>按实操奖励<span class="notice">{{data2.typeOfBonus == 3?'已启用':'未启用'}}</span>
        <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="practiceRewardFlag=true">新增</Button>
      </h3>
      <vtable :sdata="data1.data" :stype="CashRewardType" @Monitor="takeMonitor" ></vtable>
    </div>
    <Modal  v-model="practiceRewardFlag" title="新增" @on-ok="savePracticeReward">
      <span class="text">低限：</span>
      <Input v-model="practiceRewardadd.lowLimit" @on-keyup="practiceRewardadd.lowLimit=check(practiceRewardadd.lowLimit)" placeholder="低限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">高限：</span>
      <Input v-model="practiceRewardadd.highLimit" @on-keyup="practiceRewardadd.highLimit=check(practiceRewardadd.highLimit)"  placeholder="高限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">金额：</span>
      <Input v-model="practiceRewardadd.amountOfReward" @on-keyup="practiceRewardadd.amountOfReward=check2(practiceRewardadd.amountOfReward)" placeholder="奖金总额" style="width: 300px"/>
      <br/>
      <br/>
    </Modal>

    <div class="content">
      <h3>团队奖金<span class="notice">{{data2.teamBonuses==true ? '已启用':'未启用'}}</span>
      <span v-if="data2.teamBonuses==true">
        <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="Addteam">新增</Button>
      </span>
      </h3>
      <Table  :columns="columnsTeam" :data="teamBonus" v-if="teamBonus!=null" ></Table>
    </div>
    <Modal  v-model="teamFlag" title="新增" @on-ok="saveTeamBonus">
      <div>
        <span class="text">周期类型：</span>
        <Select v-model="teamadd.periodType" :transfer=true style="width:200px">
          <Option value="单月" >单月</Option>
          <Option value="季度" >季度</Option>
          <Option value="年度" >年度</Option>
        </Select>
      </div>
      <br/>
      <span class="text">开始时间：</span>
      <DatePicker v-model="teamadd.startingTime" type="date" placeholder="Select date" style="width: 120px"></DatePicker>
      <span class="text" style="padding-left: 10px;">结束时间：</span>
      <DatePicker v-model="teamadd.endTime" type="date" placeholder="Select date" style="width: 120px"></DatePicker>
      <br>
      <br>
      <span class="text">计算类型：</span>
      <Select v-model="teamadd.calculateTheType" :transfer=true style="width:200px">
        <Option value="现金" >现金</Option>
        <Option value="实操" >实操</Option>
        <Option value="客流" >客流</Option>
      </Select>
      <br>
      <br>
      <span class="text">奖金总额：</span>
      <Input v-model="teamadd.totalBonus" @on-keyup="teamadd.totalBonus=check2(teamadd.totalBonus)" placeholder="奖金总额" style="width: 300px"/>

      <br>
      <br>
      <span class="text">低限：</span>
      <Input v-model="teamadd.lowLimit" @on-keyup="teamadd.lowLimit=check(teamadd.lowLimit)" placeholder="低限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">高限：</span>
      <Input v-model="teamadd.highLimit" @on-keyup="teamadd.highLimit=check(teamadd.highLimit)" placeholder="高限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">分配类型：</span>
      <Select v-model="teamadd.assignmentType" :transfer=true style="width:200px">
        <Option value="平均" >平均</Option>
        <Option value="比例" >比例</Option>
      </Select>
      <br/>
      <br/>
    </Modal>

    <div class="content">
      <h3>活动奖金<span class="notice">{{data2.activityBonuses==true ? '已启用':'未启用'}}</span>
       <span v-if="data2.activityBonuses==true">
          <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="Addactivity">新增</Button>
       </span>
      </h3>
      <Table  :columns="columnsActivity" :data="activityBonus" v-if="activityBonus!=null" ></Table>
    </div>
    <Modal  v-model="activityFlag" title="新增" @on-ok="saveActivityBonus">
      <span class="text">开始时间：</span>
      <DatePicker v-model="activityadd.startingTime" type="date"  style="width: 100px"></DatePicker>
      <span class="text" style="padding-left: 10px;">结束时间：</span>
      <DatePicker v-model="activityadd.endTime" type="date"  style="width: 100px"></DatePicker>
      <br>
      <br>
      <span class="text">计算类型：</span>
      <Select v-model="activityadd.calculateTheType" :transfer=true style="width:200px">
        <Option value="现金" >现金</Option>
      </Select>
      <br>
      <br>
      <span class="text">奖金总额：</span>
      <Input v-model="activityadd.totalBonus" @on-keyup="activityadd.totalBonus=check2(activityadd.totalBonus)" placeholder="奖金总额" style="width: 300px"/>
      <br>
      <br>
      <span class="text">低限：</span>
      <Input v-model="activityadd.lowLimit" @on-keyup="activityadd.lowLimit=check(activityadd.lowLimit)" placeholder="奖金总额" style="width: 300px"/>
      <br>
      <br>
      <span class="text">高限：</span>
      <Input v-model="activityadd.highLimit" @on-keyup="activityadd.highLimit=check(activityadd.highLimit)" placeholder="奖金总额" style="width: 300px"/>
      <br>
      <br>
      <span class="text">分配类型：</span>
      <Select v-model="activityadd.assignmentType" :transfer=true style="width:200px">
        <Option value="平均">平均</Option>
        <Option value="比例">比例</Option>
      </Select>
      <br/>
      <br/>
    </Modal>

  </div>
</template>

<script>
  import {editSalarySystem,findBonusesJsonByStore,findSalaryByStore,editAccumulativePassengerFlow,editCashReward,editTeamBonus,deleteTeamBonus,editActivityBonus,deleteActivityBonus,editPassengerFlowAwardJson,editPracticeReward} from '../../interface'
  import vtable from './sa_table'
  export default{
    name: 'sa5',
    data(){
      return{
        cityList: [
          {
            value: 'type1',
            label: '个人现金'
          },
          {
            value: 'type2',
            label: '全店现金'
          },
        ],
        cityList1:[
          {
            value: '1',
            label: '按客流奖励'
          },
          {
            value: '2',
            label: '按现金业绩奖励'
          },
          {
            value: '3',
            label: '按实操奖励'
          },


        ],
        salarydata:[],
        data1:[],
        data2:{
          singleDayPassengerFlow: '',
          oneDayPassengerFlowAward:'',
          accumulativePassengerFlow: '',
          accumulativePassengerFlowAward: '',
        },
        accumulativedata:{},
        accumulativedataType:'accumulativedata',
        CashRewardType:'CashReward',
        PracticeRewardType: 'PracticeReward',
        teamBonus:[],
        activityBonus:[],
        teamadd:{
          assignmentType: "",
          calculateTheType: "",
          endTime: "",
          highLimit: "",
          id: '',
          lowLimit: "",
          periodType: "",
          startingTime: "",
          storeName: "",
          totalBonus: 0,
          storeId: this.$route.params.id,
        },
        activityadd:{
          assignmentType: "",
          calculateTheType: "",
          endTime: "",
          highLimit: "",
          id: '',
          lowLimit: "",
          startingTime: "",
          storeName: "",
          totalBonus: 0,
          storeId: this.$route.params.id,
        },
        accumulativeadd:{
          storeId: this.$route.params.id,
        },
        cashRewardadd:{
          storeId: this.$route.params.id,
        },
        practiceRewardadd:{
          storeId: this.$route.params.id,
        },
        accumulativeFlag: false,
        teamFlag:false,
        activityFlag: false,
        cashRewarFlag:false,
        practiceRewardFlag:false,
        columnsTeam:[
          {
            title: '周期类型',
            key: 'periodType'
          },
          {
            title: '开始时间',
            key: 'startingTime'
          },
          {
            title: '结束时间',
            key: 'endTime'
          },
          {
            title: '计算类型',
            key: 'calculateTheType'
          },
          {
            title: '奖金总额',
            key: 'totalBonus'
          },
          {
            title: '低限',
            key: 'lowLimit'
          },
          {
            title: '高限',
            key: 'highLimit'
          },
          {
            title: '分配类型',
            key: 'assignmentType'
          },
          {
            title: '操作',
            width: 200,
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.updateTeamBonus(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteTeamBonus(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        columnsActivity:[
          {
            title: '开始时间',
            key: 'startingTime'
          },
          {
            title: '结束时间',
            key: 'endTime'
          },
          {
            title: '计算类型',
            key: 'calculateTheType'
          },
          {
            title: '奖金总额',
            key: 'totalBonus'
          },
          {
            title: '低限',
            key: 'lowLimit'
          },
          {
            title: '高限',
            key: 'highLimit'
          },
          {
            title: '分配类型',
            key: 'assignmentType'
          },
          {
            title: '操作',
            width: 200,
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.updateActivityBonus(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteActivityBonus(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        test:''
      }
    },
    methods:{
      getData(){
        this.$ajax({
          method: 'get',
          url:findBonusesJsonByStore()+'?id='+this.$route.params.id
        }).then( (res) =>{
          this.data1 = res.data;
          this.accumulativedata= res.data.data;
        }).catch( (error) =>{
        });
        this.$ajax({
          method: 'get',
          url:findSalaryByStore()+'?id='+this.$route.params.id
        }).then( (res) =>{
          this.data2 = res.data;
          this.teamBonus = res.data.teamBonus;
          this.activityBonus = res.data.activityBonus;
        }).catch( (error) =>{
        });

      },
      savecomplaint(){
        this.$ajax({
          method: 'post',
          url:editPassengerFlowAwardJson(),
          data:this.data1
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');

        })
      },
      saveAccumulativePassengerFlow(){
        this.$ajax({
          method: 'post',
          url:editAccumulativePassengerFlow(),
          data:this.accumulativeadd
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');

        })
      },
      saveCashReward(){
        this.$ajax({
          method: 'post',
          url:editCashReward(),
          data:this.cashRewardadd
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');

        })
      },
      savePracticeReward(){
        this.$ajax({
          method: 'post',
          url:editPracticeReward(),
          data:this.practiceRewardadd
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');

        })
      },
      Addteam(){
        this.teamFlag=true;
        this.teamadd={
          assignmentType: "",
            calculateTheType: "",
            endTime: "",
            highLimit: "",
            id: '',
            lowLimit: "",
            periodType: "",
            startingTime: "",
            storeName: "",
            totalBonus: 0,
            storeId: this.$route.params.id,
        };
      },
      saveTeamBonus(){
        this.teamadd.startingTime = this.changeDate(this.teamadd.startingTime);
        this.teamadd.endTime = this.changeDate(this.teamadd.endTime);
        this.$ajax({
          method: 'post',
          url: editTeamBonus(),
          data: this.teamadd,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');

        })
      },
      updateTeamBonus(row){
        this.teamFlag = true;
        this.teamadd = JSON.parse(JSON.stringify(row));
      },
      deleteTeamBonus(row){
        this.$ajax({
          method: 'get',
          url: deleteTeamBonus()+'?id='+row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('删除失败');

        })

      },
      Addactivity(){
        this.activityFlag=true;
        this.activityadd={
          assignmentType: "",
            calculateTheType: "",
            endTime: "",
            highLimit: "",
            id: '',
            lowLimit: "",
            startingTime: "",
            storeName: "",
            totalBonus: 0,
            storeId: this.$route.params.id,
        };
      },
      saveActivityBonus(){
        this.activityadd.startingTime = this.changeDate(this.activityadd.startingTime);
        this.activityadd.endTime = this.changeDate(this.activityadd.endTime);
        this.$ajax({
          method: 'post',
          url: editActivityBonus(),
          data: this.activityadd,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');

        })
      },
      updateActivityBonus(row){
        this.activityFlag = true;
        this.activityadd = JSON.parse(JSON.stringify(row));
      },
      deleteActivityBonus(row){
        this.$ajax({
          method: 'get',
          url: deleteActivityBonus()+'?id='+row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('删除失败');

        })

      },
      takeMonitor(){
        this.getData();
      },
      changeDate(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      check(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      }
    },
    created(){
      this.getData();
    },
    components: { vtable, },
  }

</script>

<style scoped>
 .sa5{
   padding-left: .6rem;
   box-sizing: border-box;
 }
  .btn{
    margin: 20px 0;
  }
  .content{
    width: 95%;
    border: 1px solid #e3e3e3;
    padding: .2rem 1rem 1rem 1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 10px 0;
  }
  .notice{
    font-size:12px;
    font-weight: 300;
    margin-left: 10px;
  }
  .text{
    display: inline-block;
    width: 80px;
  }
  .Input{
    width: 100px;
    margin: 0 20px 0 0;
  }
</style>
