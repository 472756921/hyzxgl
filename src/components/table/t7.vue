<template>
  <div>
    <Checkbox v-model="data.aftermarket">顾客姓名</Checkbox>
    <Checkbox v-model="data.aftermarket">服务项目</Checkbox>
    <Checkbox v-model="data.aftermarket">现金业绩</Checkbox>
    <Checkbox v-model="data.aftermarket">高端项目</Checkbox>
    <Checkbox v-model="data.aftermarket">顾问</Checkbox>
    <h3>面部</h3>
    <Checkbox v-model="data.aftermarket">指定</Checkbox>
    <Checkbox v-model="data.aftermarket">非指定</Checkbox>
    <h3>身体</h3>
    <Checkbox v-model="data.aftermarket">指定</Checkbox>
    <Checkbox v-model="data.aftermarket">非指定</Checkbox>
    <h3>产品</h3>
    <Checkbox v-model="data.aftermarket">现金</Checkbox>
    <Checkbox v-model="data.aftermarket">超折</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣</Checkbox>
    <h3>卡扣疗程</h3>
    <Checkbox v-model="data.aftermarket">名称</Checkbox>
    <Checkbox v-model="data.aftermarket">金额</Checkbox>
    <br/>
    <br/>
    <Button class="hy_btn">保存</Button>
  </div>
</template>

<script>
  export default {
    name: "t7",
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
  h3{
    margin: 10px 0;
  }
</style>
