<template>
  <div>
      <Table  :columns="columns" :data="sdata" ></Table>
      <Modal  v-model="salaryFlag" title="修改" @on-ok="ok()">
        低限：<Input v-model="ut.lowLimit" placeholder="低限" style="width: 300px"/>
        <br/>
        <br/>
        高限：<Input v-model="ut.highLimit" placeholder="高限" style="width: 300px"/>
        <br/>
        <br/>
        金额：<Input v-model="ut.totalBonus" placeholder="金额" style="width: 300px"/>
        <br/>
        <br/>
      </Modal>


  </div>
</template>
<script>
  import {editCashPerformancePpenalty,deleteCashPerformancePpenalty,editPassengerFines,deletePassengerFines,editConsumptionPenalty,deleteConsumptionPenalty,editAccumulativePassengerFlow,deleteAccumulativePassengerFlow,editMonthlyCashVolume,deleteMonthlyCashVolume,editTotalMonthlyPassengerFlow,deleteTotalMonthlyPassengerFlow,editTotalMonthlyExercise,deleteTotalMonthlyExercise,editTotalMonthlyProject,deleteTotalMonthlyProject,editCashReward,deleteCashReward,editPracticeReward,deletePracticeReward} from '../../interface'
  export default{
    name: 'sa_table',
    data(){
      return{
        columns: [
          {
            title: '低限',
            key: 'lowLimit'
          },
          {
            title: '高限',
            key: 'highLimit'
          },
          {
            title: '金额',
            key: 'totalBonus'
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
                      this.update(params.row)
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
                      this.Delete(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        columns2: [
          {
            title: '低限',
            key: 'lowLimit'
          },
          {
            title: '高限',
            key: 'highLimit'
          },
          {
            title: '金额',
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
                      this.update(params.row)
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
                      this.Delete(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        salaryFlag: false,
        ut:{
          lowLimit: '',
          highLimit: '',
          totalBonus: '',
          id: '',
          storeId: this.$route.params.id
        },
        ut2:{
          lowLimit: '',
          highLimit: '',
          amountOfReward: '',
          id: '',
          storeId: this.$route.params.id
        },
        data:[],
        type:0,

      }
    },
    props:["sdata","stype"],
    methods:{
      ok(){
        switch(this.stype){
          case 'cashPerformancePpenaltyes':this.savecashPerformance(this.ut)
            break;
          case 'passengerFiness':this.savePassenger(this.ut)
            break;
          case 'consumptionPenaltyes':this.saveConsumption(this.ut)
            break;
          case 'accumulativedata' :this.saveAccumulativePassengerFlow(this.ut)
            break;
          case 'MonthlyCashVolume':this.saveMonthlyCashVolume(this.ut)
            break;
          case 'TotalMonthlyPassengerFlow':this.saveTotalMonthlyPassengerFlow(this.ut)
            break;
          case 'TotalMonthlyExercise':this.saveTotalMonthlyExercise(this.ut)
            break;
          case 'TotalMonthlyProject':this.saveTotalMonthlyProject(this.ut)
            break;
          case 'CashReward':this.saveCashReward(this.ut)
            break;
          case 'PracticeReward':this.savePracticeReward(this.ut)
            break;
        }
      },
      update(row){
        this.ut = row;
        this.salaryFlag = true;
      },
      Delete(row){
        switch(this.stype){
          case 'cashPerformancePpenaltyes':this.deletecashPerformance(row.id)
            break;
          case 'passengerFiness':this.deletePassenger(row.id)
            break;
          case 'consumptionPenaltyes':this.deleteConsumption(row.id)
            break;
          case 'accumulativedata' :this.deleteAccumulativePassengerFlow(row.id)
            break;
          case 'MonthlyCashVolume':this.deleteMonthlyCashVolume(row.id)
            break;
          case 'TotalMonthlyPassengerFlow':this.deleteTotalMonthlyPassengerFlow(row.id)
            break;
          case 'TotalMonthlyExercise':this.deleteTotalMonthlyExercise(row.id)
            break;
          case 'TotalMonthlyProject':this.deleteTotalMonthlyProject(row.id)
            break;
          case 'CashReward':this.deleteCashReward(row.id)
            break;
          case 'PracticeReward':this.deletePracticeReward(this.ut)
            break;
        }
      },
      savecashPerformance(row){
        this.$ajax({
          method: 'post',
          url: editCashPerformancePpenalty(),
          data: row,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deletecashPerformance(id){
        this.$ajax({
          method: 'get',
          url:deleteCashPerformancePpenalty()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');

        })

      },
      savePassenger(row){
        this.$ajax({
          method: 'post',
          url: editPassengerFines(),
          data: row,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deletePassenger(id){
        this.$ajax({
          method: 'get',
          url:deletePassengerFines()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');

        })
      },
      saveConsumption(row){
        this.$ajax({
          method: 'post',
          url: editConsumptionPenalty(),
          data: row,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deleteConsumption(id){
        this.$ajax({
          method: 'get',
          url:deleteConsumptionPenalty()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');

        })
      },
      saveAccumulativePassengerFlow(row){
        this.$ajax({
          method: 'post',
          url:editAccumulativePassengerFlow(),
          data:row
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');

        })
      },
      deleteAccumulativePassengerFlow(id){
        this.$ajax({
          method: 'get',
          url:deleteAccumulativePassengerFlow()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');
        })
      },
      saveMonthlyCashVolume(row){
        this.$ajax({
          method: 'post',
          url: editMonthlyCashVolume(),
          data: row,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deleteMonthlyCashVolume(id){
        this.$ajax({
          method: 'get',
          url:deleteMonthlyCashVolume()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');
        })
      },
      saveTotalMonthlyPassengerFlow(row){
        this.$ajax({
          method: 'post',
          url: editTotalMonthlyPassengerFlow(),
          data: row,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deleteTotalMonthlyPassengerFlow(id){
        this.$ajax({
          method: 'get',
          url:deleteTotalMonthlyPassengerFlow()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');
        })
      },
      saveTotalMonthlyExercise(row){
        this.$ajax({
          method: 'post',
          url: editTotalMonthlyExercise(),
          data: row,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deleteTotalMonthlyExercise(id){
        this.$ajax({
          method: 'get',
          url:deleteTotalMonthlyExercise()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');
        })
      },
      saveTotalMonthlyProject(row){
        this.$ajax({
          method: 'post',
          url: editTotalMonthlyProject(),
          data: row,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deleteTotalMonthlyProject(id){
        this.$ajax({
          method: 'get',
          url:deleteTotalMonthlyProject()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');
        })
      },
      saveCashReward(row){
        this.$ajax({
          method: 'post',
          url: editCashReward(),
          data: row,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deleteCashReward(id){
        this.$ajax({
          method: 'get',
          url:deleteCashReward()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');
        })
      },
      savePracticeReward(row){
        this.$ajax({
          method: 'post',
          url: editPracticeReward(),
          data: row,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.$emit('Monitor');
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      deletePracticeReward(id){
        this.$ajax({
          method: 'get',
          url:deletePracticeReward()+'?id='+id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.$emit('Monitor');
        }).catch( (error)=>{
          this.$Message.error('删除失败');
        })
      },
    },
    created(){
      /*if(this.stype == 'MonthlyCashVolume' || this.stype == 'TotalMonthlyPassengerFlow' || this.stype == 'TotalMonthlyExercise' || this.stype == 'TotalMonthlyProject' || this.stype == 'accumulativedata'){
        this.type = 1;
      }*/
    },
    mounted(){
    }
  }
</script>
