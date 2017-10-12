<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  a:link {color: #66368C}		/* 未访问的链接 */
  a:visited {color: #66368C}	/* 已访问的链接 */
  a:hover {color: #66368C}	/* 鼠标移动到链接上 */
  a:active {color: #66368C}
  .prC{
    background-color: #66368C;
  }
  .ivu-input-group-append{
    background-color: #66368C;
    color: #fff;
    border: none;
  }
  .hy_btn{
    background-color: #66368C;
    color: #fff;
  }
  .hy_btn:hover {
    border-color: #66368C;
    color: #66368C;
  }
  .option{
    padding: 10px 10px 16px;
    border-bottom: 10px solid #F5F7F9;
  }
</style>
