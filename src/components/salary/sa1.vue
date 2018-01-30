<template>
  <div class="sa1">
    <h3>{{cityList1[typeOfBaseSalary-1].label}}<span style="margin-left:10px;">{{this.data.monthlyCashType}}</span></h3>

    <div v-if="typeOfBaseSalary!=5&&typeOfBaseSalary!=6">
     <Button class="hy_btn btn" @click="salaryFlag= true;">新增</Button>
     <br>
     <vtable :sdata="salarydata" :stype="salaryType" @Monitor="takeMonitor"></vtable>
     <Modal v-model="salaryFlag" title="新增" @on-ok="ok">
       低限：<Input v-model="add.lowLimit" placeholder="低限" style="width: 300px"/>
       <br/>
       <br/>
       高限：<Input v-model="add.highLimit" placeholder="高限" style="width: 300px"/>
       <br/>
       <br/>
       金额：<Input v-model="add.amountOfReward" placeholder="金额" style="width: 300px"/>
       <br/>
       <br/>
     </Modal>
   </div>
    <div v-if="typeOfBaseSalary==5">
      固定底薪：<Input v-model="data2.baseSalary" placeholder="固定底薪" size="small" style="width: 100px"/>
      <Button class="btn" size="small" type="success" @click="save">保存</Button>
    </div>
    <div v-if="typeOfBaseSalary == 6">

      <Button class="hy_btn btn" @click="salaryFlag2=true">新增</Button>
      <br>
      <Table  :columns="columns" :data="salarydata" ></Table>
      <Modal  v-model="salaryFlag2" title="修改" @on-ok="ok()">
        员工类型：<Input v-model="add2.typeOfEmployee" placeholder="员工类型" style="width: 300px"/>
        <br/>
        <br/>
        员工级别：<Select v-model="add2.employeeLevel" style="width:90px;" size='small'>
        <Option value="一级技师" >一级技师</Option>
      </Select>
        <br/>
        <br/>
        员工底薪：<Input v-model="add2.amountOfReward" placeholder="员工底薪" style="width: 300px"/>
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
        typeOfBaseSalary: sessionStorage.getItem('typeOfBaseSalary'),
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
                    type: 'success',
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
          this.data2.oneDayPassengerFlowAward = this.data1.oneDayPassengerFlowAward;
          this.data2.singleDayPassengerFlow = this.data1.singleDayPassengerFlow;
          this.data2.accumulativePassengerFlow = this.data1.accumulativePassengerFlow;
          this.data2.accumulativePassengerFlowAward = this.data1.accumulativePassengerFlowAward;
          this.data2.monthlyCashType = res.data.monthlyCashType;
        }).catch((error)=>{

        })
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
      updateStaffLevel(row){
        this.salaryFlag2 = true;
        this.add2 = row;
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
      takeMonitor(){
        this.getData();
        this.getData2();
      }
    },
    components: { vtable },
    created(){
      this.getData();
      this.getData2();
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

</script>

<style scoped>
  .sa1{
    padding: 1rem;

  }
  h3{
    margin: 0 0 10px 0;
  }
  .btn{
    margin: 20px 0;
  }
</style>
