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
      产品名称：<Input v-model="pis.p_names" placeholder="名称" style="width: 300px"/>
      <br/>
      <br/>
      推荐次数：<Input v-model="pis.p_time" placeholder="推荐次数" style="width: 300px"/>
      <br/>
      <br/>
      项目间隔：<Input v-model="pis.p_jg" placeholder="间隔" style="width: 300px"/>
      <br/>
      <br/>
      项目单价：<Input v-model="pis.p_dj" placeholder="项目单价" style="width: 300px"/>
      <br/>
      <br/>
      现金价格：<Input v-model="pis.p_xjjg" placeholder="现金价格" style="width: 300px"/>
      <br/>
      <br/>
      卡扣价格：<Input v-model="pis.p_kkjg" placeholder="卡扣价格" style="width: 300px"/>
      <br/>
      <br/>
      体验价格：<Input v-model="pis.p_tyjg" placeholder="体验价格" style="width: 300px"/>
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
      搭配项目：<Select v-model="model1" style="width:300px">
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
      解决问题：<Input v-model="pis.p_jjzz" type="textarea" :rows="2" placeholder="解决问题"/>
      <br/>
      <br/>
      专业说明：<Input v-model="pis.p_zysm" type="textarea" :rows="2" placeholder="专业说明"/>
      <br/>
      <br/>
      技术要点：<Input v-model="pis.p_jsyd" type="textarea" :rows="2" placeholder="技术要点"/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'p_index',
    created() {
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        card: '',
        pis: {
          p_names : '',
          p_dg: '',
          p_jg : '',
          p_time : '',
          p_xjjg : '',
          p_kkjg : '',
          p_tyjg: '',
          p_zsxm : '',
          p_pzzx : '',
          p_xjq : '',
          p_jsfl : '',
          p_xffl : '',
          p_jjzz: '',
          p_zysm: '',
          p_jsyd: '',
        },
        columns: [
          {
            title: '项目',
            key: 'p_names'
          },
          {
            title: '推荐次数',
            key: 'p_time'
          },
          {
            title: '间隔',
            key: 'p_jg'
          },
          {
            title: '单价',
            key: 'p_dg'
          },
          {
            title: '现金价格',
            key: 'p_xjjg'
          },
          {
            title: '卡扣价格',
            key: 'p_kkjg'
          },
          {
            title: '体验价格',
            key: 'p_tyjg'
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
        data: [
          {
            id: 12138,
            p_names: '美白疗程',
            p_jg: '4天',
            p_time: '5次',
            p_xjjg: 2888,
            p_kkjg: 2688,
            p_zsxm: '护肤一次',
            p_pzzx: '无需等待',
            p_xjq: 400,
            p_jsfl: 280,
            p_xffl: 380,
          },
          {
            id: 12138,
            p_names: '嫩肤疗程',
            p_jg: '12天',
            p_time: '8次',
            p_xjjg: 6888,
            p_kkjg: 6688,
            p_zsxm: '护肤一次',
            p_pzzx: '无需等待',
            p_xjq: 700,
            p_jsfl: 300,
            p_xffl: 180,
          },
        ]
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.pis = {
          p_names:'',
          p_jg : '',
          p_time : '',
          p_xjjg : '',
          p_kkjg : '',
          p_zsxm : '',
          p_pzzx : '',
          p_xjq : '',
          p_jsfl : '',
          p_xffl : '',
        };

      },
      ok() {},
      mannger(data) {
        this.pis = {
          p_names : data.p_names,
          p_jg : data.p_jg,
          p_time : data.p_time,
          p_xjjg : data.p_xjjg,
          p_kkjg : data.p_kkjg,
          p_zsxm : data.p_zsxm,
          p_pzzx : data.p_pzzx,
          p_xjq : data.p_xjq,
          p_jsfl : data.p_jsfl,
          p_xffl : data.p_xffl,
        };
        this.storeFlag = true;
        this.store = '修改';
      },
    }
  };
</script>

<style scoped>

</style>
