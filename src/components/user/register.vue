<template>
  <div class="register">
    <div class="layout-logo-left">注册门店</div>
    <div>
      联系人：<Input v-model="storeVal.staffName" placeholder="联系人" style="width: 315px"/>
      <br/>
      <br/>
      联系人电话：<Input v-model="storeVal.phoneNumber" @on-keyup="storeVal.phoneNumber=check1(storeVal.phoneNumber)" placeholder="联系人电话" style="width: 290px"/>
      <br/>
      <br/>
      门店名称：<Input v-model="storeVal.storeName" placeholder="门店名称" style="width: 300px"/>
      <br/>
      <br/>
      门店城市：<Select v-model="storeVal.provinceId" style="width:150px" :transfer=true  placeholder="门店所在省" @on-change="getCities(storeVal.provinceId)">
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
      门店类型：<Select v-model="storeVal.storeType" style="width:300px" placeholder="门店类型">
        <Option value="1">美容院</Option>
        <Option value="2">皮肤管理</Option>
      </Select>
      <br/>
      <br/>
      经营方式：<Select v-model="storeVal.operationMode" style="width:300px" placeholder="经营方式">
        <Option value="1">单店</Option>
        <Option value="2">连锁</Option>
      </Select>
      <br/>
      <br/>
    </div>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="ok">注册</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="search">查询注册结果</Button>
    <Button class="hy_return" size="large" @click="returnLogin">返回</Button>

  </div>
</template>

<script>
  import { getProvinces,getCities ,userRegister,checkStorePhone} from '../../interface';
  export default{
    name: 'register',
    data(){
      return{
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
        provincesData:[],
        citiesData:[],
        successTag:''
      }
    },
    created(){
      this.getProvinces();
    },
    methods:{
      returnLogin(){
        this.$router.push({name: 'login'});
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
      ok(){
        if(this.storeVal.staffName ==''|| this.storeVal.phoneNumber ==''|| this.storeVal.storeName ==''|| this.storeVal.address ==''|| this.storeVal.telephone ==''|| this.storeVal.managementCycle ==''|| this.storeVal.storeType ==''|| this.storeVal.operationMode ==''|| this.storeVal.provinceId=='' || this.storeVal.cityId==''){
          this.$Message.warning('请填写完整信息');
          return;
        }
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
        this.$ajax({
          method: 'POST',
          url: userRegister(),
          data:this.storeVal
        }).then( (res) =>{
          this.$Message.success('注册成功，等待审核，若通过将短信方式通知您');
          this.returnLogin();
        }).catch( (error) =>{
          this.$Message.error('注册失败！');
        })
      },
      check1(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      },
      search(){
        this.$router.push({name: 'registerResult'});
      }
    }
  }
</script>

<style scoped>
  .register{
    width: 70%;
    margin: 0 auto;
    text-align: center;
  }
  .layout-logo-left{
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 20px;
    padding: 22px 0;
    color: #66368C;
    /*background-color: #66368C;*/
    text-align: center;
    width: 500px;
    margin: 0 auto;
  }
  .hy_return{
    background-color: #aaa;
    color: #fff;
    margin-left:20px;

  }
  .hy_return:hover {
    border-color: #aaa;
    color: #aaa;
    background-color: #fff;
  }
</style>
