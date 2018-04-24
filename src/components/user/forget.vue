<template>
  <div class="forget">
    <div class="layout-logo-left">忘记密码</div>
    <div style="width: 300px;margin:0 auto;text-align: left;font-size: 14px;">
      联系人电话：
      <Input v-model="phoneNumber" placeholder="联系人电话" style="width: 290px;">
        <span slot="append" class="serc" @click="getTag">获取验证码</span>
      </Input>
      <br><br>
      验证码：<br>
      <Input v-model="tag" placeholder="验证码" style="width: 300px"/>
      <div style="color:red;font-size: 12px;margin-top: 10px;" v-show="isShow">*将发送随机密码至联系人电话，请返回以随机密码登录*</div>
      <br><br>
      <div style="text-align: center;">
        <Button class="hy_btn" style="margin-right:20px;" size="large" @click="ok">提交</Button>
        <Button class="hy_return" size="large" @click="returnLogin">返回</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getVerification,updataByPhone} from '../../interface'
  export default{
    name: 'forget',
    data(){
      return{
        phoneNumber:'',
        isShow: false,
        data: '',
        tag:'',
      }
    },
    methods:{
      getTag(){
        if(this.phoneNumber == ''){
          this.$Message.warning('请输入联系人电话');
          return;
        }
        this.$ajax({
          method:'GET',
          url: getVerification()+'?phoneNumber='+this.phoneNumber,
        }).then( (res)=>{
          if(res.data.status == 2 ){
            this.$Message.error(res.data.message);
          }else{
            this.$Message.success('验证码已发送至您的手机');
          }
        }).catch( (err)=>{
        })

      },
      ok(){
        if(this.phoneNumber == ''||this.tag == ''){
          this.$Message.warning('请输入联系人电话、验证码');
          return;
        }
        this.$ajax({
          method: 'POST',
          url:updataByPhone(),
          data:{
            phoneNumber: this.phoneNumber,
            verification: this.tag,
          },
        }).then((res) =>{
          this.data = res.data;
          if(this.data.status == 1) {
            this.isShow = true;
          }else{
            this.$Message.error('验证码错误！');
          }
        }).catch( (err)=>{
        })

      },
      returnLogin(){
        this.$router.push({name: 'login'});
      }
    }
  }
</script>

<style scoped>
  .forget{
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
