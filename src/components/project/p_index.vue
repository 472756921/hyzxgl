<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="2">
      <Button class="hy_btn" @click="newEm">新建{{card}}</Button>
      </Col>
    </Row>
    <h3 style="text-align: center;padding: .6rem;">{{card}}</h3>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="storeFlag" :title="store" @on-ok="ok">
      产品名称：<Input v-model="pis.projectName" placeholder="名称" style="width: 300px"/>
      <br/>
      <br/>
      推荐次数：<Input v-model="pis.frequency" placeholder="推荐次数" style="width: 300px"/>
      <br/>
      <br/>
      项目间隔：<Input v-model="pis.intervalTime" placeholder="间隔" style="width: 300px"/>
      <br/>
      <br/>
      项目单价：<Input v-model="pis.courseMoney" placeholder="项目单价" style="width: 300px"/>
      <br/>
      <br/>
      现金价格：<Input v-model="pis.cashMoney" placeholder="现金价格" style="width: 300px"/>
      <br/>
      <br/>
      卡扣价格：<Input v-model="pis.buckleMoney" placeholder="卡扣价格" style="width: 300px"/>
      <br/>
      <br/>
      体验价格：<Input v-model="pis.experienceMoney" placeholder="体验价格" style="width: 300px"/>
      <br/>
      <br/>
      赠送项目：<Input v-model="pis.p_zsxm" placeholder="赠送项目" style="width: 300px"/>
      <br/>
      <br/>
      配赠尊享：<Input v-model="pis.p_pzzx" placeholder="配赠尊享" style="width: 300px"/>
      <br/>
      <br/>
      赠现金券：<Input v-model="pis.p_xjq" placeholder="赠现金券" style="width: 300px"/>
      <br/>
      <br/>
      介绍返利：<Input v-model="pis.p_jsfl" placeholder="介绍返利" style="width: 300px"/>
      <br/>
      <br/>
      消费返利：<Input v-model="pis.p_xffl" placeholder="消费返利" style="width: 300px"/>
      <br/>
      <br/>
      搭配项目：<Select v-model="pis.collocationItems" style="width:300px">
                <Option :value="1">项目A</Option>
                <Option :value="2">项目B</Option>
                <Option :value="3">项目C</Option>
              </Select>
      <br/>
      <br/>
      项目类别：<Select v-model="model1" style="width:300px">
                <Option :value="1">身体类</Option>
                <Option :value="2">面护类</Option>
              </Select>
      <br/>
      <br/>
      项目属性：<Select v-model="model1" style="width:300px">
                <Option :value="1">到店率</Option>
                <Option :value="2">功效类</Option>
                <Option :value="3">保养类</Option>
              </Select>
      <br/>
      <br/>
      解决问题：<Input v-model="pis.effect" type="textarea" :rows="2" placeholder="解决问题"/>
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
  import {findProjectList, projectedit, projectsave} from '../../interface';

  export default {
    name: 'p_index',
    created() {
      this.getList();
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        card: '',
        pis: {
          projectName : '',
          courseMoney: '',
          intervalTime : '',
          frequency : '',
          cashMoney : '',
          buckleMoney : '',
          experienceMoney: '',
          p_zsxm : '',
          p_pzzx : '',
          p_xjq : '',
          p_jsfl : '',
          p_xffl : '',
          effect: '',
          projectDescription: '',
          technicalPoints: '',
        },
        columns: [
          {
            title: '项目',
            key: 'projectName'
          },
          {
            title: '推荐次数',
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
              return h('Button', {
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
              }, '修改');
            }
          }
        ],
        data: [],
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.pis = {
          projectName:'',
          intervalTime : '',
          frequency : '',
          cashMoney : '',
          buckleMoney : '',
          p_zsxm : '',
          p_pzzx : '',
          p_xjq : '',
          p_jsfl : '',
          p_xffl : '',
        };

      },
      getList() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findProjectList(),
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
      },
      ok() {
        let URL = projectsave();
        if( this.store == '修改') {
          URL = projectedit();
        };
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
        }).catch((error) => {
        });
      },
      mannger(data) {
        this.pis = data;
        this.storeFlag = true;
        this.store = '修改';
      },
    }
  };
</script>

<style scoped>

</style>
