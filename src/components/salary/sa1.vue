<template>
  <div class="sa1">
    <h3>{{cityList1[typeOfBaseSalary-1].label}}<span style="margin-left:10px;">{{this.data.monthlyCashType}}</span></h3>
    <div v-if="typeOfBaseSalary!=5&&typeOfBaseSalary!=6">
     <Button class="hy_btn btn" @click="salaryFlag= true;">新增</Button>
     <br>
     <vtable :sdata="salarydata" :stype="salaryType" @Monitor="takeMonitor"></vtable>
     <Modal v-model="salaryFlag" :mask-closable="false" title="新增" @on-ok="ok">
       低限：<Input v-model="add.lowLimit" @on-keyup="add.lowLimit=check(add.lowLimit)" placeholder="低限" style="width: 300px"/>
       <br/>
       <br/>
       高限：<Input v-model="add.highLimit" @on-keyup="add.highLimit=check(add.highLimit)" placeholder="高限" style="width: 300px"/>
       <br/>
       <br/>
       金额：<Input v-model="add.amountOfReward" @on-keyup="add.amountOfReward=check2(add.amountOfReward)" placeholder="金额" style="width: 300px"/>
       <br/>
       <br/>
     </Modal>
   </div>
    <div v-if="typeOfBaseSalary==5">
      固定底薪：<Input v-model="data2.baseSalary" @on-keyup="data2.baseSalary=check2(data2.baseSalary)" placeholder="固定底薪" size="small" style="width: 100px"/>
      <Button class="btn" size="small" type="success" @click="save">保存</Button>
    </div>
    <div v-if="typeOfBaseSalary == 6">

      <Button class="hy_btn btn" @click="Add">新增</Button>
      <br>
      <Table  :columns="columns" :data="salarydata" ></Table>
      <Modal  v-model="salaryFlag2" :mask-closable="false" title="修改" @on-ok="ok()">
        员工类型：<Select v-model="add2.typeOfEmployee" style="width:300px;" >
        <Option value="美容师" >美容师</Option>
        <Option value="美发师" >美发师</Option>

      </Select>
        <br/>
        <br/>
        员工级别：<Select v-model="add2.employeeLevel" style="width:300px;">
        <Option value="1" >一级</Option>
        <Option value="2" >二级</Option>
      </Select>
        <br/>
        <br/>
        员工底薪：<Input v-model="add2.amountOfReward" @on-keyup="add2.amountOfReward=check2(add2.amountOfReward)" placeholder="员工底薪" style="width: 300px"/>
        <br/>
        <br/>
      </Modal>

    </div>
  </div>

</template>

<script>
  import {findBonusesJsonByStore,findSalaryByStore,findByStore,editMonthlyCashVolume,editTotalMonthlyPassengerFlow,editTotalMonthlyExercise,editTotalMonthlyProject,editSalarySystem,editStaffLevelBaseSalary,deleteStaffLevelBaseSalary} from '../../interface.js'
  import vtable from './sa_table'
  export default{
    name: 'sa1',
    data(){
      return{
        data:{},
        baseSalary: '',
        typeOfBaseSalary: '',
        columns: [
          {
            title: '员工类型',
            key: 'typeOfEmployee'
          },
          {
            title: '员工级别',
            key: 'employeeLevel'
          },
          {
            title: '员工底薪',
            key: 'amountOfReward'
          },
          {
            title: '操作',
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
                      this.updateStaffLevel(params.row)
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
                      this.deleteStaffLevel(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        cityList: [
        {
          value: '1',
          label: '个人'
        },
        {
          value: '2',
          label: '全店'
        },
        ],
        cityList1:[
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
            label: '按月项目总量'
          },
          {
            value: '5',
            label: '按固定底薪'
          },
          {
            value: '6',
            label: '按员工级别底薪'
          },

        ],
        salarydata:[],
        salaryType: '',
        salaryFlag: false,
        salaryFlag2: false,
        salaryFlag3: false,
        monthlyCashType:'',
        add:{
          lowLimit: '',
          highLimit: '',
          amountOfReward: '',
          storeId: this.$route.params.id,
          type: '',
        },
        add2:{
          typeOfEmployee: '',
          employeeLevel: '',
          amountOfReward:'',
          storeId: this.$route.params.id,
        },
        ut:{},
        data1:[],
        data2:[],

      }
    },
    methods:{
      getData(){
        this.$ajax({
          method: 'get',
          url: findByStore() + '?id='+this.$route.params.id+'&typeOfBaseSalary='+this.typeOfBaseSalary,
        }).then( (res) =>{
          this.data = res.data;
          this.salarydata = res.data.data;
          this.data2.oneDayPassengerFlowAward = this.data1.oneDayPassengerFlowAward;
          this.data2.singleDayPassengerFlow = this.data1.singleDayPassengerFlow;
          this.data2.accumulativePassengerFlow = this.data1.accumulativePassengerFlow;
          this.data2.accumulativePassengerFlowAward = this.data1.accumulativePassengerFlowAward;
          this.data2.monthlyCashType = res.data.monthlyCashType;
        }).catch( (error) =>{

        })
      },
      getData2(){
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
        }).then( (res) => {
          this.data2 = res.data;
          this.typeOfBaseSalary = res.data.typeOfBaseSalary;
        }).catch((error)=>{
        })
      },
      ok(){
        switch(this.typeOfBaseSalary){
          case '1': this.saveMonthlyCashVolume()
            break;
          case '2': this.saveTotalMonthlyPassengerFlow()
            break;
          case '3': this.saveTotalMonthlyExercise()
            break;
          case '4': this.saveTotalMonthlyProject()
            break;
          case '6': this.saveStaffLevelBaseSalary()
            break;
        }
      },
      saveMonthlyCashVolume(){
        this.$ajax({
          method: 'post',
          url: editMonthlyCashVolume(),
          data:this.add
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })

      },
      saveTotalMonthlyPassengerFlow(){
        if(this.add.lowLimit==''|| this.add.highLimit==''||this.add.amountOfReward==''){
          this.$Message.warning('请完整填写内容');
          return false;
        }
        this.$ajax({
          method: 'post',
          url: editTotalMonthlyPassengerFlow(),
          data:this.add
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      saveTotalMonthlyExercise(){
        if(this.add.lowLimit==''|| this.add.highLimit==''||this.add.amountOfReward==''){
          this.$Message.warning('请完整填写内容');
          return false;
        }
        this.$ajax({
          method: 'post',
          url: editTotalMonthlyExercise(),
          data:this.add
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      saveTotalMonthlyProject(){
        if(this.add.lowLimit==''|| this.add.highLimit==''||this.add.amountOfReward==''){
          this.$Message.warning('请完整填写内容');
          return false;
        }
        this.$ajax({
          method: 'post',
          url: editTotalMonthlyProject(),
          data:this.add
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      saveStaffLevelBaseSalary(){
        if(this.add2.typeOfEmployee==''|| this.add2.employeeLevel==''||this.add2.amountOfReward==''){
          this.$Message.warning('请完整填写内容');
          return false;
        }
        this.$ajax({
          method: 'post',
          url: editStaffLevelBaseSalary(),
          data:this.add2
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      updateStaffLevel(row){
        this.salaryFlag2 = true;
        this.add2 = JSON.parse(JSON.stringify(row));
      },
      deleteStaffLevel(row){
        this.$ajax({
          method: 'get',
          url: deleteStaffLevelBaseSalary()+'?id='+row.id
        }).then( (res)=>{
          this.$Message.success('删除成功');
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
      },
      save(){
          this.$ajax({
            method: 'post',
            url:editSalarySystem(),
            data: this.data2,
          }).then( (res) =>{
            this.$Message.success('保存成功');
            this.getData();
          }).catch( (err) =>{
            this.$Message.error('失败');
          })
        },
      Add(){
        this.salaryFlag2=true;
        this.add2={
          typeOfEmployee: '',
            employeeLevel: '',
            amountOfReward:'',
            storeId: this.$route.params.id,
        };
      },
      takeMonitor(){
        this.getData();
        this.getData2();
      },
      check(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      }
    },
    components: { vtable },
    created(){
      this.getData2();
    },
    mounted(){
      this.getData();
    },
    watch:{
      typeOfBaseSalary(){
        this.getData();
        switch(this.typeOfBaseSalary){
          case '1': this.salaryType = 'MonthlyCashVolume'
            break;
          case '2': this.salaryType = 'TotalMonthlyPassengerFlow'
            break;
          case '3': this.salaryType = 'TotalMonthlyExercise'
            break;
          case '4': this.salaryType = 'TotalMonthlyProject'
            break;
        }
      }
    }
  }

</script>

<style scoped>
  .sa1{
    padding-left: .6rem;
  }
  h3{
    margin: 0 0 10px 0;
  }
  .btn{
    margin: 10px 0 20px 0;
  }
</style>
