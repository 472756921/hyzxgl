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


    <Modal  v-model="storeFlag" :title="store" @on-ok="newStore">
      <Input v-model="storeVal.staffName" placeholder="联系人" style="width: 300px"/>
      <br/>
      <br/>
      <Input v-model="storeVal.telephone" placeholder="联系人电话" style="width: 300px"/>
      <br/>
      <br/>
      <Input v-model="storeVal.storeName" placeholder="门店名称" style="width: 300px"/>
      <br/>
      <br/>
      <Input v-model="storeVal.address" placeholder="门店地址" style="width: 300px"/>
      <br/>
      <br/>
      <Input v-model="storeVal.phoneNumber" placeholder="门店电话" style="width: 300px"/>
      <br/>
      <br/>
      <Input v-model="storeVal.managementCycle" placeholder="管理周期" style="width: 300px"/>
      <br/>
      <br/>
      <Select v-model="storeVal.storeType" style="width:300px" placeholder="门店类型">
        <Option value="1">美容院</Option>
        <Option value="2">皮肤管理</Option>
      </Select>
      <br/>
      <br/>
      <Select v-model="storeVal.operationMode" style="width:300px" placeholder="经营方式">
        <Option value="1">单店</Option>
        <Option value="2">连锁</Option>
      </Select>
      <br/>
      <br/>
      <RadioGroup v-model="storeVal.storeStatus" type="button" v-show="store=='编辑门店'">
        <Radio label="正在管理">正在管理</Radio>
        <Radio label="经营不善">经营不善</Radio>
        <Radio label="不再管理">不再管理</Radio>
      </RadioGroup>
    </Modal>

    <Modal  v-model="questionFlag" title="门店问题分析" @on-ok="ok" width="80%">
      联系人：<Input v-model="question.staffName" placeholder="联系人" style="width: 300px"/>
      &nbsp;
      联系人电话：<Input v-model="question.phoneNumber" placeholder="联系人电话" style="width: 275px"/>
      <br/>
      <br/>
      省份: <Input v-model="question.provinceName" placeholder="省份" style="width: 316px"/>
      &nbsp;
      店平方数：<Input v-model="question.shopSquare" placeholder="店平方数" style="width: 288px"/>
      <br/>
      <br/>
      年房租：<Input v-model="question.annualRent" placeholder="年房租" style="width: 300px"/>
      &nbsp;
      几家店：<Input v-model="question.severalStores" placeholder="几家店" style="width: 300px"/>
      <br/>
      <br/>
      房间数量：<Input v-model="question.numberOfRooms" placeholder="房间数量" style="width:288px"/>
      &nbsp;
      床位数量：<Input v-model="question.numberOfBeds" placeholder="床位数量" style="width: 288px"/>
      <br/>
      <br/>
      员工数量：<Input v-model="question.numberOfEmployees" placeholder="员工数量" style="width:288px"/>
      &nbsp;
      有无销售顾问：<Input v-model="question.areThereAnySales" placeholder="有无销售顾问" style="width: 264px"/>
      <br/>
      <br/>
      有无店长：<Input v-model="question.areThereAnyShop" placeholder="有无店长" style="width: 288px"/>
      &nbsp;
      连续十二个月店内现金流水：<Input v-model="question.cashFlow" placeholder="连续十二个月店内现金流水" style="width: 192px"/>
      <br/>
      <br/>
      连续十二个月店内实操：<Input v-model="question.practiceInTheShop" placeholder="连续十二个月店内实操" style="width: 216px"/>
      &nbsp;
      连续十二个月店内客流：<Input v-model="question.innPassengerFlow" placeholder="连续十二个月店内客流" style="width: 216px"/>
      <br/>
      <br/>
      连续十二个月店内产品业绩：<Input v-model="question.productPerformance" placeholder="连续十二个月店内产品业绩" style="width: 192px"/>
      &nbsp;
      直营产品品牌：<Input v-model="question.directProductBrand" placeholder="直营产品品牌" style="width: 264px"/>
      <br/>
      <br/>
      直营产品品牌数量：<Input v-model="question.brandNumber" placeholder="直营产品品牌数量" style="width: 240px"/>
      &nbsp;
      仪器种类：<Input v-model="question.typeOfInstrument" placeholder="仪器种类" style="width: 288px"/>
      <br/>
      <br/>
      仪器数量：<Input v-model="question.numberOfInstruments" placeholder="仪器数量" style="width: 288px"/>
      &nbsp;
      仪器品牌：<Input v-model="question.instrumentBrand" placeholder="仪器品牌" style="width: 288px"/>
      <br/>
      <br/>
      薪资制度：<Input v-model="question.salarySystem" placeholder="薪资制度" style="width: 288px"/>
      &nbsp;
      员工12个月薪资：<Input v-model="question.employeeSalary" placeholder="员工12个月薪资" style="width: 250px"/>
      <br/>
      <br/>
      项目价格单：<Input v-model="question.projectPriceList" placeholder="项目价格单" style="width: 276px"/>
      &nbsp;
      卡项：<Input v-model="question.card" placeholder="卡项" style="width: 312px"/>
      <br/>
      <br/>
      拓客卡：<Input v-model="question.extensionCard" placeholder="拓客卡" style="width: 300px"/>
      &nbsp;
      留客卡：<Input v-model="question.oneCard1" placeholder="留客卡" style="width: 300px"/>
      <br/>
      <br/>
      主要拓客方式：<Input v-model="question.extensionMethod" placeholder="主要拓客方式" style="width: 264px"/>
      &nbsp;
      每个月进店新顾客人数：<Input v-model="question.newCustomers" placeholder="每个月进店新顾客人数" style="width: 216px"/>
      <br/>
      <br/>
      成交人数：<Input v-model="question.numberOfTransactions" placeholder="成交人数" style="width: 288px"/>
      &nbsp;
      第一次成交：<Input v-model="question.numberOfTransactions1" placeholder="第一次成交" style="width: 276px"/>
      <br/>
      <br/>
      第二次成交：<Input v-model="question.numberOfTransactions2" placeholder="第二次成交" style="width: 276px"/>
      &nbsp;
      现有顾客数量：<Input v-model="question.numberOfCustomers" placeholder="现有顾客数量" style="width: 265px"/>
      <br/>
      <br/>
      老顾客续费人数：<Input v-model="question.theNumberOfRenewals" placeholder="老顾客续费人数" style="width: 252px"/>
      <br/>
      <br/>
      目前自己认为经营的最大问题是什么？：<Input v-model="question.theBiggestProblem" placeholder="目前自己认为经营的最大问题是什么？" style="width: 265px"/>
      <br/>
      <br/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { findStoreList, newStore, editStore } from '../../interface';

  export default {
    name: 's_index',
    data () {
      return {
        mdstaus: 1,
        storeFlag: false,
        questionFlag: false,
        store: '新建门店',
        serch: '',
        storeVal: {
          id: '',
          storeName: '',
          telephone: '',
          staffName: '',
          phoneNumber: '',
          operationMode: '',
          storeType: '',
          managementCycle: '',
          address: '',
          storeStatus: '',
        },
        question: {
          id: '',
          staffName: '',
          phoneNumber: '',
          provinceName: '',
          shopSquare: '',
          annualRent: '',
          severalStores: '',
          numberOfRooms: '',
          numberOfBeds: '',
          numberOfEmployees: '',
          areThereAnySales: '',
          areThereAnyShop: '',
          cashFlow: '',
          practiceInTheShop: '',
          innPassengerFlow: '',
          productPerformance: '',
          directProductBrand: '',
          brandNumber: '',
          typeOfInstrument: '',
          numberOfInstruments: '',
          instrumentBrand: '',
          salarySystem: '',
          employeeSalary: '',
          projectPriceList: '',
          card: '',
          extensionCard: '',
          oneCard1: '',
          extensionMethod: '',
          newCustomers: '',
          numberOfTransactions: '',
          numberOfTransactions1: '',
          numberOfTransactions2: '',
          numberOfCustomers: '',
          theNumberOfRenewals: '',
          theBiggestProblem: '',
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
            title: '管理周期',
            key: 'managementCycle'
          },
          {
            title: '状态',
            key: 'storeStatus',
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
        data1: [],
      }
    },
    created() {
      sessionStorage.setItem("authToken",'73d04ca9-8fa9-419f-a2d2-cc19da374dc6-s');
      this.getList();
    },
    methods: {
      newStore() {
        let URL = newStore();
        if(this.store == '编辑门店') {
          URL = editStore();
        }
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.storeVal,
          url: URL,
        }).then((res) => {
          this.$Message.success('操作成功');
        }).catch((error) => {
        });
      },
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
        }).catch((error) => {
        });
      },
      rowClassName (row, index) {
        if (row.storeStatus == '正在管理') {
          return 'jyinfo';
        } else if (row.storeStatus == '经营不善') {
          return 'jydanger';
        } else if (row.storeStatus == '不再管理') {
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
        this.clearNew();
      },
      ok() {
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.question,
          url: editStore(),
        }).then((res) => {
          this.$Message.success('操作成功');
        }).catch((error) => {
        });
      },
      change(data) {
        this.storeFlag = true;
        this.store = '编辑门店';
        this.storeVal = data;
      },
      manerge(id) {
        this.$router.push({path:'s_datile/'+id+'/c_index'});
      },
      check(data) {
        this.questionFlag = true;
        this.question = data;
      },
      clearNew() {
        this.storeVal = {
          id: '',
            storeName: '',
            telephone: '',
            staffName: '',
            phoneNumber: '',
            operationMode: '',
            storeType: '',
            managementCycle: '',
            address: '',
            storeStatus: '',
        };
      },
    },
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
</style>
