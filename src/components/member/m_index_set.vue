<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建会员等级</Button>
      </Col>
    </Row>

    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="storeFlag" :title="store" @on-ok="ok">
      会员等级：<Input v-model="m_gard" placeholder="会员等级" style="width: 300px"></Input>
      <br/>
      <br/>
      最低消费：<Input v-model="customerLast" placeholder="最低消费" style="width: 300px"></Input>
      <br/>
      <br/>
      会员称谓：<Input v-model="name" placeholder="会员称谓" style="width: 300px"></Input>
      <br/>
      <br/>
      项目折扣：<Input v-model="xmzk" placeholder="项目折扣" style="width: 300px"></Input>
      <br/>
      <br/>
      赠现金券：<Input v-model="xjq" placeholder="赠现金券" style="width: 300px"></Input>
      <br/>
      <br/>
      介绍返利：<Input v-model="fljs" placeholder="介绍返利" style="width: 300px"></Input>
      <br/>
      <br/>
      消费返利：<Input v-model="xffl" placeholder="消费返利" style="width: 300px"></Input>
      <br/>
      <br/>
      会员日折扣：<Input v-model="hyrzk" placeholder="会员日折扣" style="width: 300px"></Input>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'm_index_set',
    data() {
      return {
        storeFlag: false,
        m_gard: '',
        customerLast: '',
        name: '',
        xmzk: '',
        hyrzk: '',
        xjq: '',
        fljs: '',
        xffl: '',
        store: '新建会员',
        columns: [
          {
            title: '会员等级',
            key: 'm_gard'
          },
          {
            title: '会员称谓',
            key: 'name'
          },
          {
            title: '消费金额下限',
            key: 'customerLast'
          },
          {
            title: '项目折扣',
            key: 'xmzk'
          },
          {
            title: '会员日折扣',
            key: 'hyrzk'
          },
          {
            title: '现金券',
            key: 'xjq'
          },
          {
            title: '介绍返利',
            key: 'fljs',
          },
          {
            title: '消费返利',
            key: 'xffl',
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
              }, '管理');
            }
          }
        ],
        data: [
          {
            id: 12138,
            m_gard: '一级',
            customerLast: 20000,
            name: '钻石会员',
            xmzk: 9,
            hyrzk: 8,
            xjq: 400,
            fljs: 8,
            xffl: 8,
          },
          {
            id: 12138,
            m_gard: '二级',
            customerLast: 17000,
            name: '黄金会员',
            xmzk: 9.5,
            hyrzk: 9,
            xjq: 200,
            fljs: 9,
            xffl: 9,
          },
        ]
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建会员';
        this.m_gard = '';
        this.customerLast = '';
        this.name = '';
        this.xmzk = '';
        this.hyrzk = '';
        this.xjq = '';
        this.fljs = '';
        this.xffl = '';
      },
      ok() {},
      mannger(data) {
        this.m_gard = data.m_gard;
        this.customerLast = data.customerLast;
        this.name = data.name;
        this.xmzk = data.xmzk;
        this.hyrzk = data.hyrzk;
        this.xjq = data.xjq;
        this.fljs = data.fljs;
        this.xffl = data.xffl;
        this.storeFlag = true;
        this.store = '修改会员';
      }
    }
  };
</script>

<style scoped>

</style>
