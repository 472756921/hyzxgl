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
      产品名称：<Input v-model="p_names" placeholder="名称" style="width: 300px"></Input>
      <br/>
      <br/>
      推荐次数：<Input v-model="p_time" placeholder="推荐次数" style="width: 300px"></Input>
      <br/>
      <br/>
      项目间隔：<Input v-model="p_jg" placeholder="间隔" style="width: 300px"></Input>
      <br/>
      <br/>
      现金价格：<Input v-model="p_xjjg" placeholder="现金价格" style="width: 300px"></Input>
      <br/>
      <br/>
      卡扣价格：<Input v-model="p_kkjg" placeholder="卡扣价格" style="width: 300px"></Input>
      <br/>
      <br/>
      赠送项目：<Input v-model="p_zsxm" placeholder="赠送项目" style="width: 300px"></Input>
      <br/>
      <br/>
      配赠尊享：<Input v-model="p_pzzx" placeholder="配赠尊享" style="width: 300px"></Input>
      <br/>
      <br/>
      赠现金券：<Input v-model="p_xjq" placeholder="赠现金券" style="width: 300px"></Input>
      <br/>
      <br/>
      介绍返利：<Input v-model="p_jsfl" placeholder="介绍返利" style="width: 300px"></Input>
      <br/>
      <br/>
      消费返利：<Input v-model="p_xffl" placeholder="消费返利" style="width: 300px"></Input>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'p_index',
    watch:{
      '$route' (to, from) {
        this.getStatus(this.$route.params.type);
      }
    },
    created() {
      const type = this.$route.params.type;
      this.getStatus(type);
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        card: '',
        p_names : '',
        p_jg : '',
        p_time : '',
        p_xjjg : '',
        p_kkjg : '',
        p_zsxm : '',
        p_pzzx : '',
        p_xjq : '',
        p_jsfl : '',
        p_xffl : '',
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
            title: '现金价格',
            key: 'p_xjjg'
          },
          {
            title: '卡扣价格',
            key: 'p_kkjg'
          },
          {
            title: '配赠尊享',
            key: 'p_pzzx'
          },
          {
            title: '赠送项目',
            key: 'p_zsxm',
          },
          {
            title: '现金券',
            key: 'p_xjq',
          },
          {
            title: '介绍返利',
            key: 'p_jsfl',
          },
          {
            title: '消费返利',
            key: 'p_xffl',
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
            p_names: '美白疗程卡',
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
            p_names: '嫩肤疗程卡',
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
        this.p_names = '';
        this.p_jg = '';
        this.p_time = '';
        this.p_xjjg = '';
        this.p_kkjg = '';
        this.p_zsxm = '';
        this.p_pzzx = '';
        this.p_xjq = '';
        this.p_jsfl = '';
        this.p_xffl = '';
      },
      ok() {},
      mannger(data) {
        this.p_names = data.p_names;
        this.p_jg = data.p_jg;
        this.p_time = data.p_time;
        this.p_xjjg = data.p_xjjg;
        this.p_kkjg = data.p_kkjg;
        this.p_zsxm = data.p_zsxm;
        this.p_pzzx = data.p_pzzx;
        this.p_xjq = data.p_xjq;
        this.p_jsfl = data.p_jsfl;
        this.p_xffl = data.p_xffl;
        this.storeFlag = true;
        this.store = '修改';
      },
      getStatus(type) {
        if( type == 1 ) {
          this.card = '疗程卡';
        }
        if( type == 2 ) {
          this.card = '疗程组合卡';
        }
        if( type == 3 ) {
          this.card = '拓客卡';
        }
        if( type == 4 ) {
          this.card = '体验卡';
        }
        if( type == 5 ) {
          this.card = '产品卡';
        }
      },
    }
  };
</script>

<style scoped>

</style>
