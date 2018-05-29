<template>
  <div class="sa_index">
    <h2 style="margin: .6rem 0;">薪资管理</h2>
    <h2> <Button class="hy_btn btn"  @click="save">保存规则</Button><Button class="hy_btn btn"  @click="more">具体规则</Button></h2>
    <br>
    <h3>底薪
      <Checkbox v-model="s1">启用</Checkbox>
    </h3>
    底薪方式：
    <Select v-model="data.typeOfBaseSalary" size="small" style="width:150px;margin-right: 10px;">
      <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select v-model="data.monthlyCashType" size="small" style="width:150px;margin-right: 10px;" v-if="data.typeOfBaseSalary==1||data.typeOfBaseSalary ==2">
      <Option  value="个人">个人</Option>
      <Option  value="全店">全店</Option>
    </Select>
    <br>
    <br>

    <Row>
      <Col span="8">
      <h3>实操提成
        <Checkbox v-model="data.practicalExercises">启用</Checkbox>
      </h3>
      </Col>
      <Col span="8">
      <h3>业绩提成
        <Checkbox v-model="data.performanceDrawinges">启用</Checkbox>
      </h3>
      </Col>
      <Col span="8">
      <h3>手工费
        <Checkbox v-model="data.manualFee">启用</Checkbox>
      </h3>
      </Col>
    </Row>
    <br>

    <h3>奖金</h3>
    奖励方式：
    <Select v-model="data.typeOfBonus" size="small" style="width:150px;margin-right: 10px;">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select v-if="data.typeOfBonus==2" v-model="data.cashType" size="small" style="width:150px;margin-right: 10px;">
      <Option value="个人" >个人</Option>
      <Option value="全店" >全店</Option>
    </Select>
    <Checkbox v-model="data.teamBonuses">团队奖金</Checkbox>
    <Checkbox v-model="data.activityBonuses">活动奖金</Checkbox>
    <br>
    <br>

    <h3>罚金</h3>
    事假罚金:<Select v-model="data.typeOfLeave" size="small" style="width:150px;margin-right: 10px;">
    <Option value="1" >固定罚金</Option>
    <Option value="2" >按计算规则</Option>
  </Select>
    <Checkbox v-model="data.complaintFines">投诉罚金</Checkbox>
    <Checkbox v-model="data.leaveEarlyFines">迟到早退罚金</Checkbox>
    <Checkbox v-model="data.absenteeismFine">旷工罚金</Checkbox>
    <Checkbox v-model="data.cashPerformancePpenalty">现金业绩罚金</Checkbox>
    <Checkbox v-model="data.passengerFines">客流罚金</Checkbox>
    <Checkbox v-model="data.consumptionPenalty">消耗罚金</Checkbox>
    <Checkbox v-model="data.otherFines">其他</Checkbox>

  </div>
</template>


<script>
  import {findBonusesJsonByStore,editSalarySystem,findSalaryByStore} from '../../interface'
  import sa_index2 from './sa_index2'

  export default {
    name: "sa_index",
    data(){
      return{
        s1: true,
        data:{
          practicalExercises: false,
          performanceDrawinges: false,
          manualFee: false,
          teamBonuses: false,
          activityBonuses: false,
          complaintFines: false,
          leaveEarlyFines: false,
          leaveAfine: false,
          absenteeismFine: false,
          cashPerformancePpenalty: false,
          passengerFines: false,
          consumptionPenalty: false,
          otherFines: false,
          typeOfBaseSalary: '',
          typeOfBonus: '',
          storeId: this.$route.params.id,
          storeName: '',
          id: '',
          absenteeismFineAmount:'',
          accumulativePassengerFlow:'',
          accumulativePassengerFlowAward: '',
          baseSalary:'',
          complaintFinesAmount: '',
          oneDayPassengerFlowAward: '',
          singleDayPassengerFlow: '',
          monthlyCashType: '',
          cashType: '',
          typeOfLeave: '',
          leaveThePenaltyRules:''
        },
        data1:{},
        cityList:[
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
          }

        ],
        cityList2:[
          {
            value: '1',
            label: '按月现金总量'
          },
          {
            value: '2',
            label: '按月客流总量'
          },
          {
            value: '3',
            label: '按月实操总量'
          },
          {
            value: '4',
            label: '按月项目总数'
          },
          {
            value: '5',
            label: '按固定底薪'
          },
          {
            value: '6',
            label: '按员工级别底薪'
          }
        ],
        practicalExercises:'',
        data2:{},
        num: 0,
      }
    },
    methods:{
      getData(){
        this.$ajax({
          method: 'get',
          url:findBonusesJsonByStore()+'?id='+this.$route.params.id
        }).then( (res) =>{
          this.data1 = res.data;
        }).catch( (error) =>{
        });
        this.$ajax({
          method: 'get',
          url:findSalaryByStore()+'?id='+this.$route.params.id
        }).then( (res) =>{
          this.data = res.data;
          this.data.oneDayPassengerFlowAward = this.data1.oneDayPassengerFlowAward;
          this.data.singleDayPassengerFlow = this.data1.singleDayPassengerFlow;
          this.data.accumulativePassengerFlow = this.data1.accumulativePassengerFlow;
          this.data.accumulativePassengerFlowAward = this.data1.accumulativePassengerFlowAward;
          this.data.cashType = this.data1.cashType;
          this.data.storeId = this.$route.params.id;
        }).catch( (error) =>{
        });

      },
      save(){
        this.$ajax({
          method: 'post',
          url:editSalarySystem(),
          data: this.data,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
          // window.location.reload();
        }).catch( (err) =>{
          this.$Message.error('失败');
        })
      },
      more(){
        this.$router.push({name: 'sa_index2'})
      }
    },
    created(){
      this.getData();
    },
    components: {sa_index2 },
  }
</script>

<style scoped>
  .btn{
    margin: 0px 10px 0 0;
  }
  .sa_index{
    padding-left: 10px;
    padding-bottom: 50px;
  }
  .btnspan{
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height:30px;
    border-radius: 3px;
    text-align: center;
    background-color: #66368C;
    color: #fff;
  }
</style>
