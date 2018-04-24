<template>
  <div class="sa2">
    <h3>{{practicalExercises==true ? '已启用':'未启用'}}</h3>
    <div v-if="practicalExercises==true">
      <Button class="hy_btn btn" @click="add">新增</Button>
      <Table :columns="columns" :data="data"></Table>
      <Modal  v-model="salaryFlag" :mask-closable="false" :title="title" @on-ok="ok">
        <span class="text">低限：</span><Input v-model="ut.lowLimit" @on-keyup="ut.lowLimit=check(ut.lowLimit)" placeholder="低限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">高限：</span><Input v-model="ut.highLimit" @on-keyup="ut.highLimit=check(ut.highLimit)"placeholder="高限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">面部指定：</span><Input v-model="ut.facialPracticeAppoint" placeholder="面部指定" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">面部非指定：</span><Input v-model="ut.facialPracticeNonSpecifiedt" placeholder="面部非指定" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">身体指定：</span><Input v-model="ut.physicalExerciseAppoint" placeholder="身体指定" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">身体非指定：</span><Input v-model="ut.physicalExerciseNonSpecifiedt" placeholder="身体非指定" style="width: 150px"/>%
        <br/>
        <br/>
      </Modal>
    </div>
  </div>
</template>
<script>
  import {findSalaryByStore,editPracticalExercise,deletePracticalExercise} from '../../interface.js'
  export default{
    name: 'sa2',
    data(){
      return{
        practicalExercises:'',
        columns: [
        {
          title: '低限',
          key: 'lowLimit',
        },
        {
          title: '高限',
          key: 'highLimit',
        },
        {
          title: '面部指定',
          key: 'facialPracticeAppoint',
          render: (h, params) => {
            return h('span', params.row.facialPracticeAppoint*100+'%')
          }
        },
        {
          title: '面部非指定',
          key: 'facialPracticeNonSpecifiedt',
          render: (h, params) => {
            return h('span', params.row.facialPracticeNonSpecifiedt*100+'%')
          }
        },
        {
          title: '身体指定',
          key: 'physicalExerciseAppoint',
          render: (h, params) => {
            return h('span', params.row.physicalExerciseAppoint*100+'%')
          }
        },
        {
          title: '身体非指定',
          key: 'physicalExerciseNonSpecifiedt',
          render: (h, params) => {
            return h('span', params.row.physicalExerciseNonSpecifiedt*100+'%')
          }
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
                    this.delete(params.row)
                  }
                }
              }, '删除'),
            ]);
          }
        }
        ],
        data: [],
        title: '',
        ut:{
          facialPracticeAppoint: '',
          facialPracticeNonSpecifiedt: '',
          highLimit: "",
          lowLimit: "",
          physicalExerciseAppoint: '',
          physicalExerciseNonSpecifiedt: '',
          storeId: this.$route.params.id,
        },
        salaryFlag: false,
      }
    },
    methods:{
      getData(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore() + '?id='+this.$route.params.id,
        }).then( (res) =>{
          this.practicalExercises = res.data.practicalExercises;
          this.data = res.data.practicalExercise;
        }).catch( (error) =>{
        })
      },
      add(){
        this.title = '新增';
        this.salaryFlag = true;
        this.ut={
          facialPracticeAppoint: '',
          facialPracticeNonSpecifiedt: '',
          highLimit: "",
          lowLimit: "",
          physicalExerciseAppoint: '',
          physicalExerciseNonSpecifiedt: '',
          storeId: this.$route.params.id,
        };
      },
      update(row){
        this.title = '修改';
        this.salaryFlag = true;
        this.ut = JSON.parse(JSON.stringify(row));
        this.ut.facialPracticeAppoint = this.ut.facialPracticeAppoint*100;
        this.ut.facialPracticeNonSpecifiedt = this.ut.facialPracticeNonSpecifiedt*100;
        this.ut.physicalExerciseAppoint = this.ut.physicalExerciseAppoint*100;
        this.ut.physicalExerciseNonSpecifiedt = this.ut.physicalExerciseNonSpecifiedt*100;
      },
      ok(){
        if(this.ut.lowLimit==""&& this.ut.highLimit=="" && this.ut.facialPracticeAppoint=="" && this.ut.facialPracticeNonSpecifiedt=="" &&this.ut.physicalExerciseAppoint=="" && this.ut.physicalExerciseNonSpecifiedt==""){
          this.$Message.warning('不能全为空');
          return;
        }
        this.ut.facialPracticeAppoint = this.ut.facialPracticeAppoint/100;
        this.ut.facialPracticeNonSpecifiedt = this.ut.facialPracticeNonSpecifiedt/100;
        this.ut.physicalExerciseAppoint = this.ut.physicalExerciseAppoint/100;
        this.ut.physicalExerciseNonSpecifiedt = this.ut.physicalExerciseNonSpecifiedt/100;
        this.$ajax({
          method: 'post',
          url: editPracticalExercise(),
          data:this.ut,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      delete(row){
        this.$ajax({
          method: 'get',
          url: deletePracticalExercise() + '?id=' + row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('删除失败');
        })
      },
      checkNum(value){
        if(value.match(/[\d]*[\%]/g) == null) return true;
        else return false;
      },
      check(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      },
      changeNm(num,type){
        if(type==1){
          return num/100;
        }
        if(type == 2){
          if(num>1){
            var arr = num.toString().split('.');
            console.log(arr);
          }
          return num*100+'%'
        }
      }
    },
    created(){
      this.getData();
    }
  }

</script>
<style scoped>
  .text{
    display: inline-block;
    width: 75px;
    margin-right: 5px;
  }
  .btn{
    margin: 10px 0 20px 0;
  }
  .sa2{
    padding-left: .6rem;
  }
  h3{
    margin: 0 0 10px 0;
  }
</style>
