<template>
  <div>
    <h2 style="padding: .6rem;">项目列表</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="storeFlag" :mask-closable="false"  :title="store" @on-ok="ok">
      项目名称：<Input v-model="pis.projectName" placeholder="名称" style="width: 300px"/>
      <br/>
      <br/>
      疗程次数：<Input v-model="pis.frequency" @on-keyup="pis.frequency=check(pis.frequency)" placeholder="疗程次数" style="width: 300px"/>
      <br/>
      <br/>
      项目间隔：<Input v-model="pis.intervalTime" @on-keyup="pis.intervalTime=check(pis.intervalTime)" placeholder="间隔 天/次" style="width: 300px"/>
      <br/>
      <br/>
      项目单价：<Input v-model="pis.courseMoney" @on-keyup="pis.courseMoney=check2(pis.courseMoney)" placeholder="项目单价 次/元" style="width: 300px"/>
      <br/>
      <br/>
      现金价格：<Input v-model="pis.cashMoney" @on-keyup="pis.cashMoney=check2(pis.cashMoney)" placeholder="现金价格 疗程/元" style="width: 300px"/>
      <br/>
      <br/>
      卡扣价格：<Input v-model="pis.buckleMoney" @on-keyup="pis.buckleMoney=check2(pis.buckleMoney)" placeholder="卡扣价格 疗程/元" style="width: 300px"/>
      <br/>
      <br/>
      体验价格：<Input v-model="pis.experienceMoney" @on-keyup="pis.experienceMoney=check2(pis.experienceMoney)" ref="exs"  placeholder="体验价格 次/元" style="width: 160px"/>
      <Checkbox v-model="pis.isCalculate" @on-change="$refs.exs.disabled = !$refs.exs.disabled ">选择会员最低折扣价</Checkbox>

      <br/>
      <br/>
      搭配项目：<Select v-model="pis.collocationItems" style="width:300px" :transfer=true>
        <Option :value="items.id" :key="items.id" v-for="items in projectList">{{items.projectName}}</Option>
      </Select>
      <br/>
      <br/>
      项目类别：<Select v-model="pis.type" style="width:300px" :transfer=true>
                <Option value="身体类">身体类</Option>
                <Option value="面护类">面护类</Option>
              </Select>
      <br/>
      <br/>
      项目属性：<Select v-model="pis.projectAttributes" style="width:300px" :transfer=true>
                <Option value="到店率">到店率</Option>
                <Option value="功效类">功效类</Option>
                <Option value="保养类">保养类</Option>
              </Select>
      <br/>
      <br/>
      解决问题：<Select v-model="pis.effect" placeholder="问题症状" :multiple=true style="width:300px" :transfer=true>
        <Option v-for="item in prds" :value="item.id" :key="item.id">{{ item.problem }}</Option>
      </Select>
      <br/>
      <br/>
      专业说明：<Input v-model="pis.projectDescription" type="textarea" :rows="2" placeholder="专业说明"/>
      <br/>
      <br/>
      技术要点：<Input v-model="pis.technicalPoints" type="textarea" :rows="2" placeholder="技术要点"/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findProjectList, projectedit, projectdelete, projectsave,findproblemList,findAllProject} from '../../interface';

  export default {
    name: 'p_index',
    created() {
      this.getList();
      this.getProblem();
      this.getProject();
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        pis: {
          projectName : '',
          courseMoney: '',
          intervalTime : '',
          frequency : '',
          cashMoney : '',
          buckleMoney : '',
          experienceMoney: '',
          effect:[],
          projectDescription: '',
          technicalPoints: '',
          collocationItems: '',
          type: '',
          projectAttributes: '',
          isCalculate: '1',
          storeId: this.$route.params.id,
        },
        columns: [
          {
            title: '项目',
            key: 'projectName'
          },
          {
            title: '疗程次数',
            key: 'frequency'
          },
          {
            title: '间隔',
            key: 'intervalTime'
          },
          {
            title: '单价',
            key: 'courseMoney'
          },
          {
            title: '现金价格',
            key: 'cashMoney'
          },
          {
            title: '卡扣价格',
            key: 'buckleMoney'
          },
          {
            title: '体验价格',
            key: 'experienceMoney'
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
                      this.mannger(params.row)
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
        data: [],
        prds:[],
        projectList:[],
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.pis = {
          projectName : '',
          courseMoney: '',
          intervalTime : '',
          frequency : '',
          cashMoney : '',
          buckleMoney : '',
          experienceMoney: '',
          effect:[],
          projectDescription: '',
          technicalPoints: '',
          collocationItems: '',
          type: '',
          projectAttributes: '',
          storeId: this.$route.params.id,
          isCalculate: false,
        };
        if(this.pis.isCalculate == true){
          this.$refs.exs.disabled= true;
        }else{
          this.$refs.exs.disabled= false;

        }

      },
      getList() {
        // 73d04ca9-8fa9-419f-a2d2-cc19da374dc6-s
        console.log(sessionStorage.getItem('authToken'))
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findProjectList()+'?id='+this.$route.params.id,
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
      },
      getProblem(){
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: findproblemList()+'?id='+this.$route.params.id,
          }).then((res) => {
            this.prds = res.data;
          }).catch((error) => {
          });
      },
      getProject(){
        this.$ajax({
          method:'get',
          url: findAllProject()+'?id='+this.$route.params.id,
        }).then( (res) =>{
          this.projectList = res.data;
        }).catch( (error) =>{

        });
      },
      ok() {
        let URL = projectsave();
        if( this.store == '修改') {
          URL = projectedit();
        };
        if(this.pis.projectName == ''){
          this.$Message.warning('名称不能为空');
          return;
        }
        this.pis.isCalculate = this.pis.isCalculate == true ? '0' :'1';
        this.pis.effect = this.pis.effect.toString();
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.pis,
          url: URL,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList();
          this.getProject();
        }).catch((error) => {
          this.$Message.error('操作失败');

        });
      },
      mannger(data) {
        this.pis = JSON.parse(JSON.stringify(data));
        if (typeof data.effect == 'string') {
          this.pis.effect = data.effect.split(',').map( (it, i) => {return +it});
        }
        this.pis.isCalculate = data.isCalculate == '0' ? true:false;
        if(this.pis.isCalculate == true){
          this.$refs.exs.disabled= true;
        }else{
          this.$refs.exs.disabled= false;
        }
        this.storeFlag = true;
        this.store = '修改';
      },
      Delete(data){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: projectdelete()+'?id='+data.id,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList();
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
      check(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      },
    }
  };
</script>

<style scoped>

</style>
