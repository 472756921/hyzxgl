<template>
  <div>
    <Checkbox v-model="data.aftermarket">顾客姓名</Checkbox>
    <Checkbox v-model="data.aftermarket">服务项目或产品</Checkbox>
    <Checkbox v-model="data.aftermarket">现金</Checkbox>
    <Checkbox v-model="data.aftermarket">实操</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣</Checkbox>
    <Checkbox v-model="data.aftermarket">顾问</Checkbox>
    <Checkbox v-model="data.aftermarket">服务部门</Checkbox>
    <Checkbox v-model="data.aftermarket">服务人员</Checkbox>
    <br/>
    <br/>
    <Button class="hy_btn">保存</Button>
  </div>
</template>

<script>
  export default {
    name: "t6",
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
