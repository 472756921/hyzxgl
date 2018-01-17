<template>
  <div>
    <Checkbox v-model="data.aftermarket">现金业绩</Checkbox>
    <Checkbox v-model="data.aftermarket">客流</Checkbox>
    <Checkbox v-model="data.aftermarket">实操</Checkbox>
    <Checkbox v-model="data.aftermarket">现金产品</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣产品</Checkbox>
    <Checkbox v-model="data.aftermarket">实耗</Checkbox>
    <Checkbox v-model="data.aftermarket">高端项目现金</Checkbox>
    <Checkbox v-model="data.aftermarket">备注</Checkbox>
    <br/>
    <br/>
    <Button class="hy_btn">保存</Button>
  </div>
</template>

<script>
  export default {
    name: "t5",
    data () {
      return {
        data: {
          aftermarket: '',
        }
      }
    }
  }
</script>

<style scoped>

</style>
