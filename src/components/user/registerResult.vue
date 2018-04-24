<template>
  <div class="registerResult">

    <div class="layout-logo-left">查询注册结果</div>
    <div style="width:450px;margin: 0px auto 20px; padding-left: 30px;">
     <Row>
       <Col span="6" style="line-height: 30px;">注册联系人电话:</Col>
       <Col span="12"> <Input v-model="search" placeholder="注册联系人电话" style="width: 200px;">
       <span slot="append" class="serc" @click="searc">查找</span>
       </Input></Col>
       <Col span="2">       <Button class="hy_return" size="large"  @click="returnLogin">返回</Button>
       </Col>
     </Row>
    </div>
    <div v-show="isShow">
      联系人：<Input v-model="storeVal.staffName" placeholder="联系人" style="width: 315px"/>
      <br/>
      <br/>
      联系人电话：<Input v-model="storeVal.phoneNumber" @on-keyup="storeVal.phoneNumber=check1(storeVal.phoneNumber)" disabled placeholder="联系人电话" style="width: 290px"/>
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
      <div  style="width: 400px;margin:0 auto 50px;padding-left: 18px;text-align: left;">
        审核结果：<span v-if="storeVal.auditStatus==1" style="color: orange;">{{status}}</span>
        <span v-if="storeVal.auditStatus==3" style="color: red;">{{status}},{{storeVal.causeOfFailure}}</span>
<!--v-if="storeVal.auditStatus == '3'"-->
      </div>
      <Button class="hy_btn"  style="margin-left:20px;" size="large" @click="ok">重新注册</Button>
    </div>
    <div v-show="isShow2" style="width: 400px;margin:0 auto 50px;padding-left: 18px;text-align: left;">
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
      <div>
        审核结果：<span style="color: green;">{{status}}</span>
      </div>
    </div>

  </div>
</template>
<script>
  import { getProvinces,getCities ,userRegister,findAuditOfFailure,checkStorePhone} from '../../interface';

  export default{
    name: 'registerResult',
    data(){
      return{
        search:'',
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
        isShow: false,
        isShow2:false,
        status:'',
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
      searc(){
        if(this.search ==''){
          this.$Message.error('请输入查询内容');
          return;
        }
        this.$ajax({
          method:'GET',
          url:findAuditOfFailure()+'?phoneNumber='+this.search,
        }).then( (res) =>{
          this.storeVal = res.data;
          if(res.data!=null && res.data != ''){

            if(res.data.auditStatus =='1'){
              this.status ='审核中';
              this.isShow = true;
              this.isShow2 =false;
            }else if(res.data.auditStatus == '2' ){
              this.status ='审核通过';
              this.isShow = false;
              this.isShow2 =true;
            }else if(res.data.auditStatus == '3' ){
              this.status ='审核失败';
              this.isShow = true;
              this.isShow2 =false;
            }
          }else{
            this.isShow = false;
            this.isShow2 = false;
            this.$Message.error('查询不到相关信息！');
          }

        }).catch( (error)=>{

        })

      },
      ok(){
        if(this.storeVal.staffName ==''|| this.storeVal.telephone ==''|| this.storeVal.storeName ==''|| this.storeVal.address ==''|| this.storeVal.phoneNumber ==''|| this.storeVal.managementCycle ==''|| this.storeVal.storeType ==''|| this.storeVal.operationMode ==''|| this.storeVal.provinceId=='' || this.storeVal.cityId==''){
          this.$Message.warning('请填写完整信息');
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
      }
    }
  }
</script>
<style scoped>
  .registerResult{
    width: 70%;
    margin: 0 auto;
    text-align: center;
  }
  .serc{
    cursor: pointer;
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
  .Result{
    margin-top: 40px;
    /*border: 1px solid #000;*/
    text-align: left;
    /*padding-left: 30px;*/
  }
</style>
