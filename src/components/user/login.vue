<template>
  <div class="login" @keyup.enter="checkLogin()">
    <div class="layout-logo-left">华阳咨询管理系统</div>
    <div style="padding:50px 20px 0 20px;" >
      <span class="txt">用户名：</span><Input v-model="data.account" placeholder="用户名" style="width: 70%;" />
      <br><br><br>
      <span class="txt">密码：</span><Input v-model="data.password" type="password" placeholder="密码"  style="width: 70%;" />
    </div>
    <br>
    <div class="notice"><span style="float: left;"><a href="#/register">注册门店</a></span><span style="float: right;"><a href="#/forget">忘记密码</a></span></div>
    <div style="margin: 0 auto;text-align: center;"><Button class="hy_btn" size="large" style="width:400px;height: 40px; " @click="checkLogin">登录</Button></div>
  </div>
</template>

<script>
  import {userLogin} from '../../interface'
  export default{
    name: 'login',
    data(){
      return{
        data:{
          account:'',
          password:''
        }
      }
    },
    created(){},
    methods:{
      checkLogin(){
        if(this.data.account ==''||this.data.password==''){
          this.$Message.warning('请填写用户名，密码');
          return;
        }
        this.$ajax({
          method: 'POST',
          url: userLogin(),
          data: this.data
        }).then( (res) =>{
          if(res.data.system == null){
            this.$Message.error('该用户不存在!');
          }else{
            this.$Message.success('登陆成功');
            sessionStorage.setItem('authToken',res.data.authToken);
            sessionStorage.setItem('isLogin','1');
            sessionStorage.setItem('isSystem',res.data.system);
            sessionStorage.setItem('storeId',res.data.storeId);
            sessionStorage.setItem('reData',JSON.stringify(res.data));
            this.$router.push({name: 'main'});
          }
        }).catch( (err) =>{
          this.$Message.error('登陆失败，请检查用户名，密码');
        })

      },

    }
  }

</script>

<style scoped>
  .login{
    width:400px;
    /*height: 350px;*/
    margin: 100px auto;
    padding-bottom: 30px;
    /*border: 1px solid  #66368C;*/
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .txt{
    display: inline-block;
    width: 25%;
    font-size: 16px;
    line-height: 30px;
  }
  .layout-logo-left{
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 20px;
    padding: 22px 0;
    color: #fff;
    background-color: #66368C;
    text-align: center;
  }
  .notice{
    font-size: 13px;
    color: #999999;
    padding: 0 40px 0 20px;
    box-sizing: border-box;
    line-height: 30px;
    height: 30px;
    margin: 10px 0;
  }
  a:link {color: #999999}		/* 未访问的链接 */
  a:visited {color: #999999}	/* 已访问的链接 */
  a:hover {color: #999999}	/* 鼠标移动到链接上 */
  a:active {color: #999999}
</style>
