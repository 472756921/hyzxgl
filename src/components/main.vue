<template>
  <div class="layout">
    <Row type="flex">
      <Col span="3" class="layout-menu-left">
        <Menu :active-name="activename" theme="light" width="auto" :open-names="['1']" @on-select="go">
          <div class="layout-logo-left">华扬咨询</div>
          <MenuItem name="s_index"><i class="iconfont icon-homepage"></i>门店信息</MenuItem>
          <MenuItem name="s_check" v-if="isSystem == 'true'">
            <Icon type="clipboard"></Icon>审核门店
          </MenuItem>
        </Menu>
      </Col>
      <Col span="21">
        <div class="layout-header">
          <span class="title">管理系统</span>
          <div class="adminInfo">
            <Avatar icon="person" size="large" style="vertical-align: middle"/>
            <Dropdown @on-click="clickMenu">
              <a href="javascript:void(0)">
                <span class="user"> &nbsp;&nbsp;{{redata.realName}} <Icon type="arrow-down-b"></Icon></span>
              </a>
              <DropdownMenu slot="list" >
                <DropdownItem name="1">修改密码</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <span> &nbsp;&nbsp;|&nbsp;&nbsp; </span>
            <span class="user" @click="out">退出</span>
          </div>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          2017-2018 &copy; BENSON
        </div>
      </Col>
    </Row>
    <Modal  v-model="storeFlag" title="修改密码" :mask-closable="false" @on-ok="updatePassword">
      新密码：<Input v-model="password1" type="password" placeholder="新密码" style="width: 300px"/>
      <br><br>
      确认密码：<Input v-model="password2" type="password" placeholder="确认密码" style="width: 290px"/>
      <br><br>
    </Modal>
  </div>
</template>

<script>
  import {editPassword,logout} from '../interface'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        isSystem: sessionStorage.getItem('isSystem'),
        activename: 's_index',
        storeFlag: false,
        password1: '',
        password2: '',
        redata:JSON.parse(sessionStorage.getItem('reData'))
      }
    },
    created(){
      this.checkLogin();
      this.checkUrl();
    },
    methods: {
      go(name) {
        this.$router.push({name: name});
      },
      checkUrl(){
        var test = window.location.href;
        var arr = test.split('/');
        if(arr[arr.length-1]=='s_index'){
          this.activename = 's_index';
        }else if(arr[arr.length-1]=='s_check'){
          this.activename = 's_check';

        }
      },
      checkLogin(){
        if(sessionStorage.getItem('isLogin')!='1'){
          this.$Message.error('请登录！');
          this.$router.push({name: 'login'});
        }
      },
      clickMenu(name){
        if(name == '1'){
          this.password1 = '';
          this.password2 = '';
          this.storeFlag = true;
        }
      },
      updatePassword(){
        if(this.password1 == '' || this.password2 == ''){
          this.$Message.error('密码不能为空！');
          return;
        }
        if(this.password1 != this.password2){
          this.$Message.error('两次密码不一致！');
          return;
        }
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url:editPassword()+'?authToken='+sessionStorage.getItem('authToken')+'&password='+this.password1,
        }).then(( res)=>{
          this.$Message.success('修改成功！');
        }).catch( (err)=>{
          this.$Message.error('修改失败！');
        })

      },
      out(){
        this.$ajax({
          method:'POST',
          url:logout(),
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
        })
        sessionStorage.setItem('isLogin','0');
        this.$router.push({name:'login'});
      }
    },
  }
</script>
<style>
  .ivu-row-flex{
    min-height: 100%!important;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ivu-menu-item-active:not(.ivu-menu-submenu){
    background-color: #F7EFFE;
    color: #66368C!important;
    font-weight: 600;
    border-right: 2px solid #66368C!important;
  }
  .user:hover{
    cursor: pointer;
    font-weight: 600;
    color: #66368C;
  }
  .flex{
    min-height: 100%;
  }
  .title{
    font-weight: 600;
    font-size: 20px;
  }
  .adminInfo{
    float: right;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    min-height: 100%;
  }
  .layout-content{
    margin: 10px;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
    min-height: 100%;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #fff;
    min-height: 100%;
  }
  .layout-header{
    background: #fff;
    padding: 22px 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    border-radius: 3px;
    font-size: 20px;
    padding: 22px 0;
    color: #fff;
    background-color: #66368C;
    text-align: center;
  }
</style>
