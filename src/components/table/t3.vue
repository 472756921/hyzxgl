<template>
  <div>
    <Checkbox v-model="data.aftermarket">客流</Checkbox>
    <Checkbox v-model="data.aftermarket">总业绩</Checkbox>
    <Checkbox v-model="data.aftermarket">总实操</Checkbox>
    <Checkbox v-model="data.aftermarket">现金业绩（不含产品）</Checkbox>
    <h3>实操</h3>
    <Checkbox v-model="data.aftermarket">指定</Checkbox>
    <Checkbox v-model="data.aftermarket">非指定</Checkbox>
    <h3>产品</h3>
    <Checkbox v-model="data.aftermarket">现金</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣</Checkbox>
    <h3>其他</h3>
    <Checkbox v-model="data.aftermarket">赠送手工</Checkbox>
    <Checkbox v-model="data.aftermarket">转介绍业绩</Checkbox>
    <br/>
    <br/>
    <Button class="hy_btn">保存</Button>
  </div>
</template>

<script>
  export default {
    name: "t3",
    data () {
      return {
        data: {
          aftermarket: '',
        },
      }
    }
  }
</script>

<style scoped>
  h3{
    margin: 10px 0;
  }
</style>
