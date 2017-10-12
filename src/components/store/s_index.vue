<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="4">
        <Input v-model="serch" placeholder="门店编号、名称" style="margin-top: -1px">
        <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建门店</Button>
      </Col>
    </Row>
    <Table :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>


    <Modal  v-model="storeFlag" :title="store" @on-ok="ok">
      <Input v-model="mdName" placeholder="门店名称" style="width: 300px"></Input>
      <br/>
      <br/>
      <Input v-model="mdAddress" placeholder="门店地址" style="width: 300px"></Input>
      <br/>
      <br/>
      <Input v-model="mdPhone" placeholder="门店电话" style="width: 300px"></Input>
      <br/>
      <br/>
      <RadioGroup v-model="mdstaus" type="button" v-show="store=='编辑门店'">
        <Radio label="1">正在管理</Radio>
        <Radio label="2">经营不善</Radio>
        <Radio label="3">不再管理</Radio>
      </RadioGroup>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 's_index',
    data () {
      return {
        mdstaus: 1,
        storeFlag: false,
        store: '新建门店',
        mdName: '',
        mdAddress: '',
        mdPhone: '',
        serch: '',
        columns1: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '门店',
            key: 'name'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '联系电话',
            key: 'phone'
          },
          {
            title: '人流量',
            key: 'rll'
          },
          {
            title: '管理周期',
            key: 'glzq'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, p) => {
              if(p.row.status === 1) {
                return '正在管理';
              }
              if(p.row.status === 2) {
                return '经营不善';
              }
              if(p.row.status === 3) {
                return '不再管理';
              }
            },
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
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
                      this.change(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.status==3?true:false,
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      if(params.row.status ==3 ){
                        this.$Message.error('该门店已经放弃了管理');
                      }
                      this.manerge(params.row.id);
                    }
                  }
                }, '管理'),
              ]);
            }
          }
        ],
        data1: [
          {
            id: 12138,
            status: 1,
            name: '华府门店',
            rll: 18,
            address: '北京市朝阳区芍药居',
            phone: '0815-123123',
            glzq: '1个月',
          },
          {
            id: 12138,
            status: 1,
            name: '环球门店',
            rll: 25,
            address: '北京市海淀区西二旗',
            phone: '0815-123123',
            glzq: '1个月',
          },
          {
            id: 12138,
            status: 3,
            name: '石羊场门店',
            rll: 30,
            address: '上海市浦东新区世纪大道',
            phone: '0815-123123',
            glzq: '1个月',
          },
          {
            id: 12138,
            status: 2,
            name: '天府广场门店',
            rll: 26,
            address: '深圳市南山区深南大道',
            phone: '0815-123123',
            glzq: '1个月',
          }
        ]
      }
    },
    methods: {
      rowClassName (row, index) {
        if (row.status === 1) {
          return 'jyinfo';
        } else if (row.status === 2) {
          return 'jydanger';
        } else if (row.status === 3) {
          return 'jydis';
        }
        return '';
      },
      serc() {
        if(this.serch == '') {
          this.$Message.error('请输入查询内容');
        }
      },
      newEm() {
        this.storeFlag = true;
        this.store = '新建门店';
        this.mdName = '';
        this.mdAddress = '';
        this.mdPhone = '';
      },
      ok() {

      },
      change(data) {
        this.storeFlag = true;
        this.store = '编辑门店';
        this.mdName = data.name;
        this.mdAddress = data.address;
        this.mdPhone = data.phone;
        this.mdstaus = data.status;
      },
      manerge(id) {
        this.$router.push({path:'s_datile/'+id});
      },
    },
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
</style>
