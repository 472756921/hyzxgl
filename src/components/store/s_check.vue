<template>
  <div>
    <div style="width: 300px;margin: 10px 0">
      <Input v-model="serch" placeholder="门店名称" style="margin-top: -1px"><span slot="append" class="serc" @click="serc">查找</span></Input>
    </div>
    <Table :columns="columns1" :data="data1"></Table>
    <Modal  v-model="storeFlag" title="详情"  :mask-closable="false"  @on-ok="ok">
      <div style="padding-left: 20px;">
        联系人：{{storeVal.staffName}}
        <br/>
        <br/>
        联系人电话：{{storeVal.phoneNumber}}
        <br/>
        <br/>
        门店名称：{{storeVal.storeName}}
        <br/>
        <br/>
        门店所在省：{{storeVal.provinceName}}
        <br/>
        <br/>
        门店所在市：{{storeVal.cityName}}
        <br/>
        <br/>
        门店所在区/县：{{storeVal.area}}
        <br/>
        <br/>
        门店地址：{{storeVal.address}}
        <br/>
        <br/>
        门店电话：{{storeVal.telephone}}
        <br/>
        <br/>
        管理周期：{{storeVal.managementCycle}}
        <br/>
        <br/>
        门店类型：{{storeVal.storeType=='1' ? '美容院':'皮肤管理'}}
        <br/>
        <br/>
        经营方式：{{storeVal.operationMode == '1'?'单店':'连锁'}}
        <br>
        <br>
        审核选择：<Select v-model="auditStatus" style="width:300px" placeholder="审核选择" :transfer=true>
        <Option value="2">通过</Option>
        <Option value="3">拒绝</Option>
        </Select>
        <div v-if="auditStatus=='3'" style="margin-top: 10px;">
          拒绝通过原因：<Input v-model="causeOfFailure" type="textarea" :autosize="true" placeholder="拒绝通过原因" style="width: 275px"/>
        </div>
        <!--<div v-show="isShow" style="color: red;">*请填写拒绝通过原因*</div>-->
      </div>
    </Modal>
  </div>
</template>
<script>
import { findStoreRegister,getProvinces,getCities,auditStoreCustomer } from '../../interface';
  export default{
    name: 's_check',
    data(){
      return{
        serch: '',
        storeVal: {
          id: '',
          storeName: '',
          cityName:'',
          provinceName: '',
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
          area: '',
        },
        columns1: [
          {
            title: '编号',
            key: 'code'
          },
          {
            title: '门店名称',
            key: 'storeName'
          },
          {
            title: '省',
            key: 'provinceName'
          },
          {
            title: '市',
            key: 'cityName'
          },
          {
            title: '区',
            key: 'cityName'
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
            title: '门店类型',
            key: 'storeType',
            render:(h,params)=>{
              return h('div',params.row.storeType == 1 ?'美容院':'皮肤管理')
            }
          },
          {
            title: '管理周期',
            key: 'managementCycle'
          },
          {
            title: '审核状态',
            key: 'auditStatus',
            render:(h,params)=>{
              return h('div',params.row.auditStatus == 3 ?'拒绝':'审核中')
            }
          },
          {
            title: '操作',
            width: 200,
            key: 'action',
            render: (h, params) => {
              return h('Button', {
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
                }, '详情');
            }
          }
        ],
        storeFlag:false,
        provincesData:[],
        citiesData:[],
        data1:[],
        orData:[],
        isSystem: sessionStorage.getItem('isSystem'),
        storeId: sessionStorage.getItem('storeId'),
        auditStatus:'',
        causeOfFailure:'',
        isShow:false,
      }
    },
    created(){
      this.getList();
    },
    methods:{
      serc() {
        if(this.serch == '') {
          this.data1 = this.orData;
        }else{
          this.data1 = this.orData.filter((it)=>it.storeName == this.serch);
        }
      },
      getList(){
        this.$ajax({
          method:'GET',
          url:findStoreRegister(),
        }).then( (res)=>{
          this.data1 = res.data.results;
          this.orData = res.data.results;
        }).catch((error)=>{

        })
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
      check(data){
        this.storeFlag = true;
        this.storeVal = data;

        this.auditStatus =data.auditStatus == 3 ? data.auditStatus : null;
        this.causeOfFailure =data.causeOfFailure;
      },
      check1(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      },
      ok(){
        if(this.auditStatus==''){
          this.$Message.error('请选择审核！');
          return;
        }
        if(this.auditStatus == 3 && (this.causeOfFailure == ''|| this.causeOfFailure ==null)){
          // this.isShow = true;
          this.$Message.error('请填写拒绝通过原因!');
          return;
        }
        this.$ajax({
          method:'POST',
          url: auditStoreCustomer(),
          data:{
            id: this.storeVal.id,
            auditStatus: this.auditStatus,
            causeOfFailure: this.causeOfFailure
          }
        }).then( (res)=>{
          this.$Message.success('操作成功');
          this.getList();
        })
      }
    }
  }

</script>
<style scoped>
.serc{
  cursor: pointer;
}
</style>
