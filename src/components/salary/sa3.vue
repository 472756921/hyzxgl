<template>
  <div style="margin-left: 5px;">
    <h3>{{performanceDrawinges == true ? '已启用':'未启用'}}</h3>
    <div v-if="performanceDrawinges == true">
      <Button class="hy_btn btn" @click="add">新增</Button>
      <Table :columns="columns" :data="data"></Table>
      <Modal  v-model="salaryFlag" :title="title" @on-ok="ok">
        <span class="text">低限：</span><Input v-model="ut.lowLimit" placeholder="低限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">高限：</span><Input v-model="ut.highLimit" placeholder="高限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">卡项销售：</span><Input v-model="ut.cardSales" placeholder="卡项销售" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">卡扣项目：</span><Input v-model="ut.buckleProject" placeholder="卡扣项目" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">卡扣产品：</span><Input v-model="ut.buckleProduct" placeholder="卡扣产品" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">高端项目：</span><Input v-model="ut.highEndProject" placeholder="高端项目" style="width: 300px"/>
        <br/>
        <br/>
      </Modal>
    </div>
  </div>
</template>
<script>
  import {findSalaryByStore,editPerformanceDrawing,deletePerformanceDrawing} from '../../interface.js'
  export default{
    name: 'sa3',
    data(){
      return{
        performanceDrawinges: '',
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
            title: '卡项销售',
            key: 'cardSales'
          },
          {
            title: '卡扣项目',
            key: 'buckleProject'
          },
          {
            title: '卡扣产品',
            key: 'buckleProduct'
          },
          {
            title: '高端项目',
            key: 'highEndProject'
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
        data:[
          {
            low: '1000',
            high: '1500',
            faceon: '0.1',
            unfaceon: '0.2',
            bodyon: '0.1',
            unbodyon: '0.1'
          },
          {
            low: '1000',
            high: '1500',
            faceon: '0.1',
            unfaceon: '0.2',
            bodyon: '0.1',
            unbodyon: '0.1'
          }
        ],
        ut:{},
        title: '',
        salaryFlag: false,
      }
    },
    methods:{
      getData(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore() + '?id='+this.$route.params.id,
        }).then( (res) =>{
          this.performanceDrawinges = res.data.performanceDrawinges;
          this.data = res.data.performanceDrawing;
        }).catch( (error) =>{
        })
      },
      add(){
        this.title = '新增';
        this.salaryFlag = true;
        this.ut.lowLimit = '';
        this.ut.highLimit ='';
        this.ut.cardSales = '';
        this.ut.buckleProject = '';
        this.ut.buckleProduct = '';
        this.ut.highEndProject  = '';
        this.ut.id = '';
        this.ut.storeId = this.$route.params.id;
        this.ut.type = '1';
      },
      update(row){
        this.title = '修改';
        this.salaryFlag = true;
        this.ut = row;
      },
      ok(){
        this.$ajax({
          method: 'post',
          url: editPerformanceDrawing(),
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
          url: deletePerformanceDrawing() + '?id=' + row.id,
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
