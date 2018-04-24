<template>
  <div class="sa3">
    <h3>{{performanceDrawinges == true ? '已启用':'未启用'}}</h3>
    <div v-if="performanceDrawinges == true">
      <Button class="hy_btn btn" @click="add">新增</Button>
      <Table :columns="columns" :data="data"></Table>
      <Modal  v-model="salaryFlag" :mask-closable="false" :title="title" @on-ok="ok">
        <span class="text">低限：</span><Input v-model="ut.lowLimit" @on-keyup="ut.lowLimit=check(ut.lowLimit)" placeholder="低限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">高限：</span><Input v-model="ut.highLimit" @on-keyup="ut.highLimit=check(ut.highLimit)" placeholder="高限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">储值：</span><Input v-model="ut.storedValue" placeholder="储值" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">现金疗程：</span><Input v-model="ut.cashCourse" placeholder="现金疗程" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">现金产品：</span><Input v-model="ut.cashProduct" placeholder="现金产品" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">卡扣疗程：</span><Input v-model="ut.buckleCourse" placeholder="卡扣疗程" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">卡扣产品：</span><Input v-model="ut.buckleProduct" placeholder="卡扣产品" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">超折产品：</span><Input v-model="ut.superProduct" placeholder="超折产品" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">高端项目：</span><Input v-model="ut.highEndProject" placeholder="高端项目" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">其他：</span><Input v-model="ut.otherProduct" placeholder="其他" style="width: 150px"/>%
        <br/>
        <br/>
        <!---->
       <!-- <span class="text">卡项销售：</span><Input v-model="ut.cardSales" placeholder="卡项销售" style="width: 300px"/>
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
        <br/>-->
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
            title: '储值',
            key: 'storedValue',
            render: (h, params) => {
              return h('span', params.row.storedValue*100+'%')
            }
          },
          {
            title: '现金疗程',
            key: 'cashCourse',
            render: (h, params) => {
              return h('span', params.row.cashCourse*100+'%')
            }
          },
          {
            title: '现金产品',
            key: 'cashProduct',
            render: (h, params) => {
              return h('span', params.row.cashProduct*100+'%')
            }
          },
          {
            title: '卡扣疗程',
            key: 'buckleCourse',
            render: (h, params) => {
              return h('span', params.row.buckleCourse*100+'%')
            }
          },
          {
            title: '卡扣产品',
            key: 'buckleProduct',
            render: (h, params) => {
              return h('span', params.row.buckleProduct*100+'%')
            }
          },
          {
            title: '超折产品',
            key: 'superProduct',
            render: (h, params) => {
              return h('span', params.row.superProduct*100+'%')
            }
          },
         /* {
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
          },*/
          {
            title: '高端项目',
            key: 'highEndProject',
            render: (h, params) => {
              return h('span', params.row.highEndProject*100+'%')
            }
          },
          {
            title: '其他',
            key: 'otherProduct',
            render: (h, params) => {
              return h('span', params.row.otherProduct*100+'%')
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
        data:[],
        ut:{
          lowLimit:'',
          highLimit:'',
          id: '',
          storeId: this.$route.params.id,
          type: '',
          storedValue:'',
          cashCourse:'',
          cashProduct:'',
          buckleCourse:'',
          buckleProduct:'',
          superProduct:'',
          highEndProject:'',
          otherProduct:'',
        },
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
        this.ut={
          lowLimit:'',
          highLimit:'',
          id: '',
          storeId: this.$route.params.id,
          type: '',
          storedValue:'',
          cashCourse:'',
          cashProduct:'',
          buckleCourse:'',
          buckleProduct:'',
          superProduct:'',
          highEndProject:'',
          otherProduct:'',
        };
        this.ut.type = '1';
      },
      update(row){
        this.title = '修改';
        this.salaryFlag = true;
        this.ut =JSON.parse(JSON.stringify(row));
        this.ut.storedValue = this.ut.storedValue*100;
        this.ut.cashCourse = this.ut.cashCourse*100;
        this.ut.cashProduct = this.ut.cashProduct*100;
        this.ut.buckleCourse = this.ut.buckleCourse*100;
        this.ut.buckleProduct = this.ut.buckleProduct*100;
        this.ut.superProduct = this.ut.superProduct*100;
        this.ut.otherProduct = this.ut.otherProduct*100;
        this.ut.highEndProject = this.ut.highEndProject*100;
      },
      ok(){
        if(this.ut =='' ){
          this.$Message.warning('不能全部为空');
          return;
        }
        this.ut.storedValue = this.ut.storedValue/100;
        this.ut.cashCourse = this.ut.cashCourse/100;
        this.ut.cashProduct = this.ut.cashProduct/100;
        this.ut.buckleCourse = this.ut.buckleCourse/100;
        this.ut.buckleProduct = this.ut.buckleProduct/100;
        this.ut.superProduct = this.ut.superProduct/100;
        this.ut.otherProduct = this.ut.otherProduct/100;
        this.ut.highEndProject = this.ut.highEndProject/100;
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
  .sa3{
    padding: 0 .6rem;
  }
  h3{
    margin: 0 0 10px 0;
  }
</style>
