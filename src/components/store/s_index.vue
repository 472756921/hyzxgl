<template>
  <div>
    <Row :gutter="24" class="option" v-if="isSystem == 'true'">
      <Col span="4">
        <Input v-model="serch" placeholder="门店名称" style="margin-top: -1px">
        <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2" v-if="searchActive">
      <Button class="hy_btn" @click="Return">返回列表</Button>
      </Col>
      <Col span="2">
        <Button class="hy_btn"  @click="newEm">新建门店</Button>
      </Col>
    </Row>
    <Table :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
    <div class="page" v-if="isSystem == 'true'">
      <Page :total="pages*10" @on-change="getPage" style="float: right;"></Page>
    </div>


    <Modal  v-model="storeFlag" :title="store" :mask-closable="false" @on-ok="newStore" >
      联系人：<Input v-model="storeVal.staffName" placeholder="联系人" style="width: 310px"/>
      <br/>
      <br/>
      联系人电话：<Input v-model="storeVal.phoneNumber" @on-keyup="storeVal.phoneNumber=check1(storeVal.phoneNumber)" placeholder="联系人电话" style="width: 290px"/>
      <br/>
      <br/>
      门店名称：<Input v-model="storeVal.storeName" placeholder="门店名称" style="width: 300px"/>
      <br/>
      <br/>
      门店省市：<Select v-model="storeVal.provinceId" style="width:150px" :transfer=true  placeholder="门店所在省" @on-change="getCities(storeVal.provinceId)">
        <Option :value="item.id" :key="item.id" v-for="item in provincesData">{{item.name}}</Option>
      </Select>
      <Select v-model="storeVal.cityId" style="width:150px" :transfer=true  placeholder="门店所在市">
        <Option :value="item.id" :key="item.id" v-for="item in citiesData">{{item.name}}</Option>
      </Select>
      <br/>
      <br/>
      门店地址：<Input v-model="storeVal.address" placeholder="门店地址" style="width: 300px"/>
      <br/>
      <br/>
      门店电话：<Input v-model="storeVal.telephone" @on-keyup="storeVal.telephone=check1(storeVal.telephone)"  placeholder="门店电话" style="width: 300px"/>
      <br/>
      <br/>
      管理周期：<Input v-model="storeVal.managementCycle" @on-keyup="storeVal.managementCycle=check1(storeVal.managementCycle)" placeholder="管理周期" style="width: 300px"/>
      <br/>
      <br/>
      门店类型：<Select v-model="storeVal.storeType" style="width:300px" :transfer=true  placeholder="门店类型">
        <Option value="1">美容院</Option>
        <Option value="2">皮肤管理</Option>
      </Select>
      <br/>
      <br/>
      经营方式：<Select v-model="storeVal.operationMode" style="width:300px" :transfer=true  placeholder="经营方式">
        <Option value="1">单店</Option>
        <Option value="2">连锁</Option>
      </Select>
      <br/>
      <br/>
      <RadioGroup v-model="storeVal.storeStatus" type="button" v-show="store=='编辑门店'">
        <Radio label="1">正在管理</Radio>
        <Radio label="2">经营不善</Radio>
        <Radio label="3">不再管理</Radio>
      </RadioGroup>

      <div slot="footer">
        <Button type="error" size="large" long @click="newStore">提交</Button>
      </div>
    </Modal>

    <Modal  v-model="questionFlag" :mask-closable="false" title="门店问题分析" @on-ok="ok" width="80%">
      联系人：<Input v-model="question.staffName" placeholder="联系人" style="width: 300px"/>
      &nbsp;
      联系人电话：<Input v-model="question.phoneNumber" @on-keyup="question.phoneNumber=check1(question.phoneNumber)" placeholder="联系人电话" style="width: 275px"/>
      <br/>
      <br/>
      省份: <Input v-model="question.provinceName" placeholder="省份" style="width: 316px"/>
      店平方数：<Input v-model="question.shopSquare" @on-keyup="question.shopSquare=check1(question.shopSquare)" placeholder="店平方数" style="width: 288px"/>
      <br/>
      <br/>
      年房租：<Input v-model="question.annualRent" @on-keyup="question.annualRent=check2(question.annualRent)"  placeholder="年房租" style="width: 300px"/>
      &nbsp;
      门店总数：<Input v-model="question.severalStores" @on-keyup="question.severalStores=check1(question.severalStores)" placeholder="几家店" style="width: 300px"/>
      <br/>
      <br/>
      房间数量：<Input v-model="question.numberOfRooms" @on-keyup="question.numberOfRooms=check1(question.numberOfRooms)" placeholder="房间数量" style="width:288px"/>
      &nbsp;
      床位数量：<Input v-model="question.numberOfBeds" @on-keyup="question.numberOfBeds=check1(question.numberOfBeds)" placeholder="床位数量" style="width: 288px"/>
      <br/>
      <br/>
      员工数量：<Input v-model="question.numberOfEmployees" @on-keyup="question.numberOfEmployees=check1(question.numberOfEmployees)"  placeholder="员工数量" style="width:288px"/>
      有无销售顾问：
      <Select v-model="question.areThereAnySales" style="width:264px">
        <Option :value="有" :key="1">有</Option>
        <Option :value="无" :key="2">无</Option>
      </Select>
      <br/>
      <br/>
      有无店长：<Input v-model="question.areThereAnyShop" placeholder="有无店长" style="width: 288px"/>
      连续十二个月店内现金流水：<Input v-model="question.cashFlow" @on-keyup="question.cashFlow=check2(question.cashFlow)" placeholder="连续十二个月店内现金流水" style="width: 192px"/>
      <br/>
      <br/>
      连续十二个月店内实操：<Input v-model="question.practiceInTheShop" @on-keyup="question.practiceInTheShop=check2(question.practiceInTheShop)"  placeholder="连续十二个月店内实操" style="width: 216px"/>
      &nbsp;
      连续十二个月店内客流：<Input v-model="question.innPassengerFlow" @on-keyup="question.innPassengerFlow=check2(question.innPassengerFlow)" placeholder="连续十二个月店内客流" style="width: 216px"/>
      <br/>
      <br/>
      连续十二个月店内产品业绩：<Input v-model="question.productPerformance" @on-keyup="question.productPerformance=check2(question.productPerformance)"  placeholder="连续十二个月店内产品业绩" style="width: 192px"/>
      直营产品品牌：<Input v-model="question.directProductBrand" placeholder="直营产品品牌" style="width: 264px"/>
      <br/>
      <br/>
      直营产品品牌数量：<Input v-model="question.brandNumber" @on-keyup="question.brandNumber=check1(question.brandNumber)" placeholder="直营产品品牌数量" style="width: 240px"/>
      仪器种类：<Input v-model="question.typeOfInstrument" placeholder="仪器种类" style="width: 288px"/>
      <br/>
      <br/>
      仪器数量：<Input v-model="question.numberOfInstruments" @on-keyup="question.numberOfInstruments=check1(question.numberOfInstruments)" placeholder="仪器数量" style="width: 288px"/>
      仪器品牌：<Input v-model="question.instrumentBrand" placeholder="仪器品牌" style="width: 288px"/>
      <br/>
      <br/>
      薪资制度：<Input v-model="question.salarySystem" placeholder="薪资制度" style="width: 288px"/>
      &nbsp;
      员工12个月薪资：<Input v-model="question.employeeSalary" @on-keyup="question.employeeSalary=check2(question.employeeSalary)" placeholder="员工12个月薪资" style="width: 250px"/>
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
      每个月进店新顾客人数：<Input v-model="question.newCustomers" @on-keyup="question.newCustomers=check1(question.newCustomers)" placeholder="每个月进店新顾客人数" style="width: 216px"/>
      <br/>
      <br/>
      成交人数：<Input v-model="question.numberOfTransactions" @on-keyup="question.numberOfTransactions=check1(question.numberOfTransactions)" placeholder="成交人数" style="width: 288px"/>
      &nbsp;
      第一次成交：<Input v-model="question.numberOfTransactions1" placeholder="第一次成交" style="width: 276px"/>
      <br/>
      <br/>
      第二次成交：<Input v-model="question.numberOfTransactions2" placeholder="第二次成交" style="width: 276px"/>
      &nbsp;
      现有顾客数量：<Input v-model="question.numberOfCustomers" @on-keyup="question.numberOfCustomers=check1(question.numberOfCustomers)" placeholder="现有顾客数量" style="width: 265px"/>
      <br/>
      <br/>
      老顾客续费人数：<Input v-model="question.theNumberOfRenewals" @on-keyup="question.theNumberOfRenewals=check1(question.theNumberOfRenewals)" placeholder="老顾客续费人数" style="width: 252px"/>
      <br/>
      <br/>
      目前自己认为经营的最大问题是什么？：<Input v-model="question.theBiggestProblem" type="textarea" :autosize="true" placeholder="目前自己认为经营的最大问题是什么？" style="width: 265px"/>
      <br/>
      <br/>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { findStoreList,findStoreListById, newStore, editStore,deleteStore,getProvinces,getCities,checkStorePhone } from '../../interface';
  export default {
    name: 's_index',
    data () {
      return {
        mdstaus: 1,
        storeFlag: false,
        questionFlag: false,
        store: '新建门店',
        serch: '',
        searchActive: false,
        storeVal: {
          id: '',
          storeName: '',
          cityName:'',
          telephone: '',
          staffName: '',
          phoneNumber: '',
          operationMode: '',
          storeType: '',
          managementCycle: '',
          address: '',
          storeStatus: '',
          provinceId:'',
          cityId:'',
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
            key: 'code'
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
            title: '联系人电话',
            key: 'phoneNumber'
          },
          {
            title: '门店电话',
            key: 'telephone'
          },
          {
            title: '管理周期',
            key: 'managementCycle'
          },
          {
            title: '状态',
            key: 'storeStatus',
            render:(h,params)=>{
              if(params.row.storeStatus=='1'){
                return h('div','正在管理')
              }else if(params.row.storeStatus=='2'){
                return h('div','经营不善')
              }else if(params.row.storeStatus=='3'){
                return h('div','不再管理')
              }
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
                }, '店务诊断表'),
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
                      this.manerge(params.row.id, params.row.storeName );
                    }
                  }
                }, '管理'),
              /*  h('Button', {
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
                      this.Delete(params.row.id);
                    }
                  }
                }, '删除'),*/
              ]);
            }
          }
        ],
        data1: [],
        total:'',
        page:1,
        pagesize: 10,
        pages:'',
        provincesData:[],
        citiesData:[],
        successTag:'',
        tag:1,
        isSystem: sessionStorage.getItem('isSystem'),
        storeId: sessionStorage.getItem('storeId'),
      }
    },
    created() {
      this.getData();
      this.getProvinces();
    },
    methods: {
      newStore() {
        if(this.storeVal.staffName ==''|| this.storeVal.phoneNumber ==''|| this.storeVal.storeName ==''|| this.storeVal.address ==''|| this.storeVal.telephone ==''|| this.storeVal.managementCycle ==''|| this.storeVal.storeType ==''|| this.storeVal.operationMode ==''|| this.storeVal.provinceId=='' || this.storeVal.cityId==''){
          this.$Message.warning('请填写完整信息');
          return false;
        }
        let URL;
        if(this.store == '编辑门店') {
          URL = editStore();
        }else{
          URL = newStore();
          this.$ajax({
            method:'GET',
            url:checkStorePhone()+'?phoneNumber='+this.storeVal.phoneNumber
          }).then( (res)=>{
            this.successTag = res.success;
          }).catch( (err)=>{
          })
          if(this.successTag){
            this.$Message.error('联系人电话已被注册！');
            return;
          }
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
          this.getData();
        }).catch((error) => {
        });
      },
      getData(){
        this.tag = 1;
        if(this.isSystem == 'true'){
          this.getList('',this.page,this.pagesize);
        }else{
          this.getList(this.storeId,this.page,this.pagesize);
        }
      },
      getList(name,page,pagesize) {
        if(name==''||name==null){
          var URL = findStoreList()+'?page='+page+'&pageSize='+pagesize;
        }else{
          URL = findStoreList()+'?id='+name+'&page='+page+'&pageSize='+pagesize;
        }
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url:URL,
        }).then((res) => {
          this.data1 = res.data.results;
          this.pages = res.data.pages;
        }).catch((error) => {
        });
      },
      getSearch(name,page,pagesize) {
        this.tag = 2;
        if(name==''||name==null){
          var URL = findStoreList()+'?page='+page+'&pageSize='+pagesize;
        }else{
          URL = findStoreList()+'?name='+name+'&page='+page+'&pageSize='+pagesize;
        }
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url:URL,
        }).then((res) => {
          this.data1 = res.data.results;
          this.pages = res.data.pages;
        }).catch((error) => {
        });
      },
      getPage(current){
        this.page = current;
        if(this.tag == 1){
          this.getData();
        }else if(this.tag == 2){
          this.getSearch(this.serch,this.page,this.pagesize);
        }

      },
      getProvinces(){
        this.$ajax({
          method: 'GET',
          url: getProvinces()
        }).then( (res) =>{
          this.provincesData = res.data;
        })
      },
      getCities(id){
        this.$ajax({
          method: 'GET',
          url: getCities()+id,
        }).then( (res) =>{
          this.citiesData = res.data;
        })
      },
      rowClassName (row, index) {
        if (row.storeStatus == '1') {
          return 'jyinfo';
        } else if (row.storeStatus == '2') {
          return 'jydanger';
        } else if (row.storeStatus == '3') {
          return 'jydis';
        }
        return '';
      },
      serc() {
        if(this.serch == '') {
          this.$Message.warning('请输入查询内容');
        }else{
          this.searchActive = true;
          this.getSearch(this.serch,this.page,this.pagesize);
        }
      },
      Return(){
        this.searchActive = false;
        this.serch = '';
        this.getData();
      },
      newEm() {
        this.storeFlag = true;
        this.store = '新建门店';
        this.clearNew();
      },
      ok() {
        if(this.storeVal.staffName ==''|| this.storeVal.telephone ==''|| this.storeVal.storeName ==''|| this.storeVal.address ==''|| this.storeVal.phoneNumber ==''|| this.storeVal.managementCycle ==''|| this.storeVal.storeType ==''|| this.storeVal.operationMode ==''|| this.storeVal.provinceId=='' || this.storeVal.cityId==''){
          this.$Message.warning('请填写完整信息');
          return;
        }
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
          this.searchActive = false;
          this.serch = '';
          this.getData();
        }).catch((error) => {
        });
      },
      change(data) {
        this.storeFlag = true;
        this.store = '编辑门店';
        this.storeVal = JSON.parse(JSON.stringify(data));
      },
      manerge(id, storeName) {
        this.$router.push({path:'s_datile/'+id+'/c_index', query:{storeName: storeName}});
      },
      Delete(id){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },

          url: deleteStore()+'?id='+id,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.searchActive = false;
          this.serch = '';
          this.getData();
        }).catch((error) => {
        });
      },
      check(data) {
        this.questionFlag = true;
        this.question = JSON.parse(JSON.stringify(data));
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
      check1(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      },
    },
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
  .page{
    height: 50px;
    margin-top:20px;
    padding-right: 20px;
    background: #fff;
  }
</style>
