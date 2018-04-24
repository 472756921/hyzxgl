<template>
  <div style="margin-left:5px;">
    <div class="content">
      <h3>投诉罚金 <span class="notice">{{data.complaintFines==true ? '已启用':'未启用'}}</span>
      </h3>
      <span v-if="data.complaintFines==true">
        金额:<Input v-model="data.complaintFinesAmount" @on-keyup="data.complaintFinesAmount=check2(data.complaintFinesAmount)" placeholder="投诉罚金  元" size="small" class="Input"/>
      <Button class="btn" size="small" type="success" @click="savecomplaint">保存</Button>
      </span>
    </div>

    <div class="content">
      <h3>迟到早退罚金<span class="notice">{{data.leaveEarlyFines==true ? '已启用':'未启用'}}</span>
        <span v-if="data.leaveEarlyFines==true"><Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="AddleaveEarlyFines">新增</Button></span>
      </h3>
      <div v-for="item in leaveEarlyFiness" style="margin: 10px 0;">
        时间(min)：<Input v-model="item.leaveEarlyTime" @on-keyup="item.leaveEarlyTime=check(item.leaveEarlyTime)" placeholder="迟到早退时间 min" size="small"  class="Input"/>
        金额:<Input v-model="item.totalBonus" @on-keyup="item.totalBonus=check2(item.totalBonus)" placeholder="迟到早退罚金" size="small"  class="Input"/>
        <Button class="btn" size="small" type="success" @click="update(2,item)">保存</Button>
        <Button class="btn" size="small" type="warning" @click="Delete(2,item)">删除</Button>
      </div>
    </div>

    <div class="content">
      <h3>事假罚金<span class="notice">{{data.leaveAfine==true ? '已启用':'未启用'}}</span>
      </h3>
      <div v-if="data.typeOfLeave=='1'">
        按固定罚金：<Input v-model="data.leaveThePenaltyRules" @on-keyup="data.leaveThePenaltyRules=check(data.leaveThePenaltyRules)"  size="small" class="Input"/>元/天<Button class="btn" size="small" type="success" @click="savecomplaint" style="margin-left: 10px;">保存</Button>
      </div>
      <div v-else>
        按计算规则：月收入／实际出勤天数*请假天数
      </div>
    </div>

    <div class="content">
      <h3>旷工罚金<span class="notice">{{data.absenteeismFine==true ? '已启用':'未启用'}}</span>
      </h3>
      <span v-if="data.absenteeismFine==true">
        金额:<Input v-model="data.absenteeismFineAmount"  @on-keyup="data.absenteeismFineAmount=check2(data.absenteeismFineAmount)" placeholder="旷工罚金" size="small" class="Input"/>
      <Button class="btn" size="small" type="success" @click="ok(4)">保存</Button>
      </span>
    </div>

    <div class="content">
     <h3>现金业绩罚金<span class="notice">{{data.cashPerformancePpenalty==true ? '已启用':'未启用'}}</span>
       <span v-if="data.cashPerformancePpenalty">
         <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="Add(5)">新增</Button>
       </span>
     </h3>
      <vtable :sdata="cashPerformancePpenaltyes" :stype="cashPerformancePpenaltyesType" @Monitor="takeMonitor"></vtable>
    </div>

    <div class="content">
      <h3>客流罚金<span class="notice">{{data.passengerFines==true ? '已启用':'未启用'}}</span>
        <span v-if="data.passengerFines==true">
          <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="Add(6)">新增</Button>
        </span>
      </h3>
      <vtable :sdata="passengerFiness" :stype="passengerFinessType" @Monitor="takeMonitor"></vtable>
    </div>

    <div class="content">
      <h3>消耗罚金<span class="notice">{{data.consumptionPenalty==true ? '已启用':'未启用'}}</span>
        <span v-if="data.consumptionPenalty==true">
          <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="Add(7)">新增</Button>
        </span>
      </h3>
      <vtable :sdata="consumptionPenaltyes" :stype="consumptionPenaltyesType" @Monitor="takeMonitor"></vtable>
    </div>

    <div class="content">
      <h3>其他<span class="notice">{{data.otherFines==true ? '已启用':'未启用'}}</span>
      </h3>
    </div>

    <Modal  v-model="salaryFlag2" title="新增" @on-ok="ok(2)">
      <span class="text">迟到早退时间：</span><Input v-model="add2.leaveEarlyTime" @on-keyup="add2.leaveEarlyTime=check(add2.leaveEarlyTime)" placeholder="迟到早退时间 分钟" style="width: 300px"/>
      <br/>
      <br/>
      <span class="text">金额：</span><Input v-model="add2.totalBonus" @on-keyup="add2.totalBonus=check2(add2.totalBonus)" placeholder="金额" style="width: 300px"/>
      <br/>
      <br/>
    </Modal>
    <Modal  v-model="salaryFlag3" title="新增" @on-ok="ok(3)">
      <span class="text">天数：</span><Input v-model="add3.personalLeave" @on-keyup="add3.personalLeave=check(add3.personalLeave)" placeholder="天数" style="width: 300px"/>
      <br/>
      <br/>
      <span class="text">金额：</span><Input v-model="add3.totalBonus" @on-keyup="add3.totalBonus=check2(add3.totalBonus)" placeholder="金额" style="width: 300px"/>
      <br/>
      <br/>
    </Modal>
    <Modal  v-model="salaryFlag5" title="新增" @on-ok="ok(add5.type)">
      <span class="text">低限：</span><Input v-model="add5.lowLimit" @on-keyup="add5.lowLimit=check(add5.lowLimit)" placeholder="低限" style="width: 300px"/>
      <br/>
      <br/>
      <span class="text">高限：</span><Input v-model="add5.highLimit" @on-keyup="add5.highLimit=check(add5.highLimit)" placeholder="高限" style="width: 300px"/>
      <br/>
      <br/>
      <span class="text">金额：</span><Input v-model="add5.totalBonus" @on-keyup="add5.totalBonus=check2(add5.totalBonus)" placeholder="金额" style="width: 300px"/>
      <br/>
      <br/>
    </Modal>

  </div>
</template>
<script>
  import {findBonusesJsonByStore,findSalaryByStore,editSalarySystem,editLeaveEarlyFines,deleteLeaveEarlyFines,editLeaveAfine,deleteLeaveAfine,editCashPerformancePpenalty,deleteCashPerformancePpenalty,editPassengerFines,deletePassengerFines,editConsumptionPenalty,deleteConsumptionPenalty} from '../../interface.js'
  import vtable from './sa_table'
  export default{
    name: 'sa7',
    data(){
      return{
        data:{
          practicalExercises: false,
          performanceDrawinges: false,
          manualFee: false,
          teamBonuses: false,
          activityBonuses: false,
          complaintFines: false,
          leaveEarlyFines: false,
          leaveAfines: false,
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

        },
        data2:{},
        salaryFlag2: false,
        salaryFlag3: false,
        salaryFlag5: false,
        add2:{
          leaveEarlyTime:'',
          totalBonus: '',
          storeId: this.$route.params.id

        },
        add3:{
          personalLeave: '',
          totalBonus: '',
          storeId: this.$route.params.id
        },
        add5:{
          lowLimit: '',
          highLimit: '',
          totalBonus: '',
          type: '',
          storeId: this.$route.params.id
        },
        leaveEarlyFiness:[],
        leaveAfines:[],
        cashPerformancePpenaltyes:[],
        cashPerformancePpenaltyesType: 'cashPerformancePpenaltyes',
        passengerFiness:[],
        passengerFinessType:'passengerFiness',
        consumptionPenaltyes:[],
        consumptionPenaltyesType:'consumptionPenaltyes',
        s: true,
        model1:'',
        model2:'',
        vertical:'1',
        cityList:[
          {
            value: '0',
            label: '投诉罚金'
          },
          {
            value: '1',
            label: '迟到早退罚金'
          },
          {
            value: '2',
            label: '事假罚金'
          },
          {
            value: '3',
            label: '旷工罚金'
          },
          {
            value: '4',
            label: '现金业绩罚金'
          },
          {
            value: '5',
            label: '客流罚金'
          },
          {
            value: '6',
            label: '消耗罚金'
          },
          {
            value: '7',
            label: '其他'
          },
        ],
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

          this.leaveEarlyFiness = res.data.leaveEarlyFiness;
          this.leaveAfines = res.data.leaveAfines;
          this.cashPerformancePpenaltyes = res.data.cashPerformancePpenaltyes;
          this.passengerFiness = res.data.passengerFiness;
          this.consumptionPenaltyes = res.data.consumptionPenaltyes;
        }).catch( (error) =>{
        });

      },
      AddleaveEarlyFines(){
        this.salaryFlag2=true;
        this.add2={
          leaveEarlyTime:'',
            totalBonus: '',
            storeId: this.$route.params.id

        };
      },
      AddleaveAfine(){
        this.salaryFlag3=true;
        this.add3={
          personalLeave: '',
            totalBonus: '',
            storeId: this.$route.params.id
        };
      },
      Add(type){
        this.add5={
          lowLimit: '',
            highLimit: '',
            totalBonus: '',
            type: '',
            storeId: this.$route.params.id
        };
        this.add5.type = type;
        this.salaryFlag5 = true;
      },
      ok(val){
        switch(val){
          case 1:this.savecomplaint();
            break;
          case 2: this.saveleave(this.add2)
            break;
          case 3: this.saveAfines(this.add3)
            break;
          case 4: this.savecomplaint();
            break;
          case 5: this.savecashPerformance(this.add5)
            break;
          case 6: this.savePassenger(this.add5)
            break;
          case 7: this.saveConsumption(this.add5)
            break;
        };
      },
      update(val,row){
        switch(val){
          case 1: this.savecomplaint()
            break;
          case 2: this.saveleave(row)
            break;
          case 3: this.saveAfines(row)
            break;
        }
        this.getData();
      },
      Delete(val,row){
        switch(val){
          case 1: this.deletecomplaint()
            break;
          case 2: this.deleteleave(row)
            break;
          case 3: this.deleteAfines(row)
            break;
        }
        console.log('1111111');
        this.getData();
      },
      savecomplaint(){
        this.$ajax({
          method: 'post',
          url:editSalarySystem(),
          data:this.data
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deletecomplaint(){},
      saveleave(row){
        this.$ajax({
          method: 'post',
          url: editLeaveEarlyFines(),
          data: row,
        }).then( (res) =>{
          this.add2.leaveEarlyTime = '';
          this.add2.totalBonus = '';
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deleteleave(row){
        this.$ajax({
          method: 'get',
          url: deleteLeaveEarlyFines()+'?id='+row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('删除失败');
        })
      },
      saveAfines(row){
        this.$ajax({
          method: 'post',
          url: editLeaveAfine(),
          data: row,
        }).then( (res) =>{
          this.add3.personalLeave = '';
          this.add3.totalBonus = '';
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })

      },
      deleteAfines(row){
        this.$ajax({
          method: 'get',
          url: deleteLeaveAfine()+'?id='+row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('删除失败');
        })
      },
      savecashPerformance(row){
        this.$ajax({
          method: 'post',
          url: editCashPerformancePpenalty(),
          data: row,
        }).then( (res) =>{
          this.add5.lowLimit = '';
          this.add5.highLimit = '';
          this.add5.totalBonus = '';
          this.add5.type = '';
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      savePassenger(row){
        this.$ajax({
          method: 'post',
          url: editPassengerFines(),
          data: row,
        }).then( (res) =>{
          this.add5.lowLimit = '';
          this.add5.highLimit = '';
          this.add5.totalBonus = '';
          this.add5.type = '';
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      saveConsumption(row){
        this.$ajax({
          method: 'post',
          url: editConsumptionPenalty(),
          data: row,
        }).then( (res) =>{
          this.add5.lowLimit = '';
          this.add5.highLimit = '';
          this.add5.totalBonus = '';
          this.add5.type = '';
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      takeMonitor(){
        this.getData();
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
    components: { vtable },

  }
</script>
<style scoped>
  .btn{
    margin: 0 2px 0 0;
  }
  .notice{
    font-size:12px;
    font-weight: 300;
    margin-left: 10px;
  }
  .Input{
    width: 100px;
    margin: 0 20px 0 0;

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
  .text{
    display: inline-block;
    width: 100px;
  }
  h3{
    margin: 0 0 10px 0;
  }
</style>
