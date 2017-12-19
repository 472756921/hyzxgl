<template>
  <div class="layout">
    <Row type="flex" style="height: 100%">
      <Col span="3" class="layout-menu-left">
        <Menu active-name="s_index" theme="light" width="auto" :open-names="['1']" @on-select="go">
          <div class="layout-logo-left">华扬咨询</div>
          <MenuItem name="s_index"><i class="iconfont icon-homepage"></i>门店信息</MenuItem>
        </Menu>
      </Col>
      <Col span="21">
      <div class="layout-header">
        <span class="title">管理系统</span>
        <div class="adminInfo">
          <Avatar icon="person" size="large" style="vertical-align: middle"/>
          <span class="user"> &nbsp;&nbsp;刘德华 <Icon type="arrow-down-b"></Icon>
          </span>
          <span> &nbsp;&nbsp;|&nbsp;&nbsp; </span>
          <span class="user">退出&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      go(name) {
        this.$router.push({name: name});
      }
    },
  }
</script>

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
    height: 100%;
  }
  .layout-content{
    min-height: 300px;
    margin: 10px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    height: 85%;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #fff;
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
