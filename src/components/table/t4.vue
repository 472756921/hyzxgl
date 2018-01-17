<template>
  <div>
    <Checkbox v-model="data.aftermarket">全店业绩</Checkbox>
    <Checkbox v-model="data.aftermarket">全店客流</Checkbox>
    <Checkbox v-model="data.aftermarket">个人业绩</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣项目</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣产品</Checkbox>
    <Checkbox v-model="data.aftermarket">备注</Checkbox>
    <br/>
    <br/>
    <Button class="hy_btn">保存</Button>
  </div>
</template>

<script>
    export default {
      name: "t4",
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
