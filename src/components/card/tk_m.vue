<template>
  <div class="list">
    <Button class="hy_btn" @click="addF=true">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
    export default {
        name: "tk_m"
    }
</script>

<style scoped>
  .list{
    padding: 10px;
  }
  .mod{
    line-height: 60px;
  }
  .com{
    margin: 10px 0;
  }
  .group{
    padding: 10px;
  }

</style>
