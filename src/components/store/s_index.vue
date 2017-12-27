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
      <Input v-model="mdPerName" placeholder="联系人" style="width: 300px"/>
      <br/>
      <br/>
      <Input v-model="mdPerPhone" placeholder="联系人电话" style="width: 300px"/>
      <br/>
      <br/>
      <Input v-model="mdName" placeholder="门店名称" style="width: 300px"/>
      <br/>
      <br/>
      <Input v-model="mdAddress" placeholder="门店地址" style="width: 300px"/>
      <br/>
      <br/>
      <Input v-model="mdPhone" placeholder="门店电话" style="width: 300px"/>
      <br/>
      <br/>
      <Select v-model="mdType" style="width:300px" placeholder="门店类型">
        <Option value="1">美容院</Option>
        <Option value="2">皮肤管理</Option>
      </Select>
      <br/>
      <br/>
      <Select v-model="mdWay" style="width:300px" placeholder="经营方式">
        <Option value="1">单店</Option>
        <Option value="2">连锁</Option>
      </Select>
      <br/>
      <br/>
      <RadioGroup v-model="mdstaus" type="button" v-show="store=='编辑门店'">
        <Radio label="1">正在管理</Radio>
        <Radio label="2">经营不善</Radio>
        <Radio label="3">不再管理</Radio>
      </RadioGroup>
    </Modal>

    <Modal  v-model="questionFlag" title="门店问题分析" @on-ok="ok" width="30%">
      联系人：<Input v-model="question.name" placeholder="联系人" style="width: 300px"/>
      &nbsp;
      联系人电话：<Input v-model="question.phone" placeholder="联系人电话" style="width: 275px"/>
      <br/>
      <br/>
      省份: <Input v-model="mdName" placeholder="省份" style="width: 316px"/>
      &nbsp;
      店平方数：<Input v-model="mdAddress" placeholder="店平方数" style="width: 288px"/>
      <br/>
      <br/>
      年房租：<Input v-model="mdPhone" placeholder="年房租" style="width: 300px"/>
      &nbsp;
      几家店：<Input v-model="mdPhone" placeholder="几家店" style="width: 300px"/>
      <br/>
      <br/>
      房间数量：<Input v-model="mdPhone" placeholder="房间数量" style="width:288px"/>
      &nbsp;
      床位数量：<Input v-model="mdPhone" placeholder="床位数量" style="width: 288px"/>
      <br/>
      <br/>
      员工数量：<Input v-model="mdPhone" placeholder="员工数量" style="width:288px"/>
      &nbsp;
      有无销售顾问：<Input v-model="mdPhone" placeholder="有无销售顾问" style="width: 264px"/>
      <br/>
      <br/>
      有无店长：<Input v-model="mdPhone" placeholder="有无店长" style="width: 288px"/>
      &nbsp;
      连续十二个月店内现金流水：<Input v-model="mdPhone" placeholder="连续十二个月店内现金流水" style="width: 192px"/>
      <br/>
      <br/>
      连续十二个月店内实操：<Input v-model="mdPhone" placeholder="连续十二个月店内实操" style="width: 216px"/>
      &nbsp;
      连续十二个月店内客流：<Input v-model="mdPhone" placeholder="连续十二个月店内客流" style="width: 216px"/>
      <br/>
      <br/>
      连续十二个月店内产品业绩：<Input v-model="mdPhone" placeholder="连续十二个月店内产品业绩" style="width: 192px"/>
      &nbsp;
      直营产品品牌：<Input v-model="mdPhone" placeholder="直营产品品牌" style="width: 264px"/>
      <br/>
      <br/>
      直营产品品牌数量：<Input v-model="mdPhone" placeholder="直营产品品牌数量" style="width: 240px"/>
      &nbsp;
      仪器种类：<Input v-model="mdPhone" placeholder="仪器种类" style="width: 288px"/>
      <br/>
      <br/>
      仪器数量：<Input v-model="mdPhone" placeholder="仪器数量" style="width: 288px"/>
      &nbsp;
      仪器品牌：<Input v-model="mdPhone" placeholder="仪器品牌" style="width: 288px"/>
      <br/>
      <br/>
      薪资制度：<Input v-model="mdPhone" placeholder="薪资制度" style="width: 288px"/>
      &nbsp;
      员工12个月薪资：<Input v-model="mdPhone" placeholder="员工12个月薪资" style="width: 250px"/>
      <br/>
      <br/>
      项目价格单：<Input v-model="mdPhone" placeholder="项目价格单" style="width: 276px"/>
      &nbsp;
      卡项：<Input v-model="mdPhone" placeholder="卡项" style="width: 312px"/>
      <br/>
      <br/>
      拓客卡：<Input v-model="mdPhone" placeholder="拓客卡" style="width: 300px"/>
      &nbsp;
      留客卡：<Input v-model="mdPhone" placeholder="留客卡" style="width: 300px"/>
      <br/>
      <br/>
      主要拓客方式：<Input v-model="mdPhone" placeholder="主要拓客方式" style="width: 264px"/>
      &nbsp;
      每个月进店新顾客人数：<Input v-model="mdPhone" placeholder="每个月进店新顾客人数" style="width: 216px"/>
      <br/>
      <br/>
      成交人数：<Input v-model="mdPhone" placeholder="成交人数" style="width: 288px"/>
      &nbsp;
      第一次成交：<Input v-model="mdPhone" placeholder="第一次成交" style="width: 276px"/>
      <br/>
      <br/>
      第二次成交：<Input v-model="mdPhone" placeholder="第二次成交" style="width: 276px"/>
      &nbsp;
      现有顾客数量：<Input v-model="mdPhone" placeholder="现有顾客数量" style="width: 265px"/>
      <br/>
      <br/>
      老顾客续费人数：<Input v-model="mdPhone" placeholder="老顾客续费人数" style="width: 252px"/>
      <br/>
      <br/>
      目前自己认为经营的最大问题是什么？：<Input v-model="mdPhone" placeholder="目前自己认为经营的最大问题是什么？" style="width: 265px"/>
      <br/>
      <br/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { findStoreList } from '../../interface';

  export default {
    name: 's_index',
    data () {
      return {
        mdstaus: 1,
        storeFlag: false,
        questionFlag: false,
        store: '新建门店',
        mdName: '',
        mdPerName: '',
        mdPerPhone: '',
        mdAddress: '',
        mdPhone: '',
        mdType: '',
        mdWay: '',
        serch: '',
        question: {
          name: '',
          phone: '',
          pr: '',
          area: '',
          fz: '',
          numb: '',
          roomNum: '',
          bedNum: '',
          erNum: '',
          isGW: '',
          isDZ: '',
          xjls: '',
          shic: '',
          kl: '',
          cpyj: '',
          zupp: '',
          zuppNum: '',
          yqzl: '',
          yqNum: '',
          yqPp: '',
          xzZD: '',
          e12xzZD: '',
          prp: '',
          prpC: '',
          tkc: '',
          lkc: '',
          tkfs: '',
          xgknum: '',
          cjrs: '',
          dycj: '',
          decj: '',
          xygkl: '',
          lgkxfrs: '',
          maxTrub: '',
        },
        columns1: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '门店',
            key: 'storeName'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '联系电话',
            key: 'telephone'
          },
          {
            title: '人流量',
            key: 'numberOfCustomers'
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
                      this.check(params.row)
                    }
                  }
                }, '诊断'),
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
    created() {
      sessionStorage.setItem("authToken",'73d04ca9-8fa9-419f-a2d2-cc19da374dc6-s');
      this.getList();
    },
    methods: {
      getList() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findStoreList(),
        }).then((res) => {
          this.data1 = res.data.results;
//          this.questionList = res.data;
        }).catch((error) => {
        });
      },
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
      check(data) {
        this.questionFlag = true;
      },
    },
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
</style>
