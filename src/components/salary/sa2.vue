<template>
  <div style="margin-left: 5px;">
    <h3>{{practicalExercises==true ? '已启用':'未启用'}}</h3>
    <div v-if="practicalExercises==true">
      <Button class="hy_btn btn" @click="add">新增</Button>
      <Table :columns="columns" :data="data"></Table>
      <Modal  v-model="salaryFlag" :title="title" @on-ok="ok">
        <span class="text">低限：</span><Input v-model="ut.lowLimit" placeholder="低限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">高限：</span><Input v-model="ut.highLimit" placeholder="高限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">面部指定：</span><Input v-model="ut.facialPracticeAppoint" placeholder="面部指定" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">面部非指定：</span><Input v-model="ut.facialPracticeNonSpecifiedt" placeholder="面部非指定" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">身体指定：</span><Input v-model="ut.physicalExerciseAppoint" placeholder="身体指定" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">身体非指定：</span><Input v-model="ut.physicalExerciseNonSpecifiedt" placeholder="身体非指定" style="width: 300px"/>
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
        },
        {
          title: '面部非指定',
          key: 'facialPracticeNonSpecifiedt',
        },
        {
          title: '身体指定',
          key: 'physicalExerciseAppoint',
        },
        {
          title: '身体非指定',
          key: 'physicalExerciseNonSpecifiedt',
        },
        {
          title: '操作',
          width: 200,
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
                    this.delete(params.row)
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.manerge(params.row);
                  }
                }
              }, '失效'),
              ]);
          }
        }
        ],
        data: [
          {
            disable: true,
            enable: true,
            facialPracticeAppoint: '0.01',
            facialPracticeNonSpecifiedt: '0.01',
            highLimit: "1000",
            lowLimit: "1500",
            physicalExerciseAppoint: '0.01',
            physicalExerciseNonSpecifiedt: '0.01',

          }
        ],
        title: '',
        ut:{},
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
          console.log('*********');
          console.log(this.data);
        }).catch( (error) =>{
        })
      },
      add(){
        this.title = '新增';
        this.salaryFlag = true;
        this.ut.lowLimit = '';
        this.ut.highLimit ='';
        this.ut.facialPracticeAppoint= '';
        this.ut.facialPracticeNonSpecifiedt= '';
        this.ut.physicalExerciseAppoint= '';
        this.ut.physicalExerciseNonSpecifiedt = '';
        this.ut.id = '';
        this.ut.storeId = this.$route.params.id;
      },
      update(row){
        this.title = '修改';
        this.salaryFlag = true;
        this.ut = row;
      },
      ok(){
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
      }
    },
    created(){
      this.getData();
    }
  }

</script>
<style scoped>
  h3{
    margin: 10px 0;
  }
  .text{
    display: inline-block;
    width: 75px;
    margin-right: 5px;
  }
  .btn{
    margin: 20px 0;
  }

</style>
