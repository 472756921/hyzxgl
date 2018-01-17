<template>
  <div>
    <h3>会员储值</h3>
    <Checkbox v-model="data.preSale">售前</Checkbox>
    <Checkbox v-model="data.aftermarket">售后</Checkbox>
    <h3>美容</h3>
    <Checkbox v-model="data.aftermarket">现金</Checkbox>
    <Checkbox v-model="data.aftermarket">实操</Checkbox>
    <h3>美发</h3>
    <Checkbox v-model="data.aftermarket">现金</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣</Checkbox>
    <h3>瑜伽</h3>
    <Checkbox v-model="data.aftermarket">现金</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣</Checkbox>
    <h3>产品</h3>
    <Checkbox v-model="data.aftermarket">现金</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣</Checkbox>
    <h3>高端项目</h3>
    <Checkbox v-model="data.aftermarket">现金</Checkbox>
    <Checkbox v-model="data.aftermarket">卡扣</Checkbox>
    <h3>其他</h3>
    <Checkbox v-model="data.aftermarket">欠款</Checkbox>
    <br/>
    <br/>
    <Button class="hy_btn">保存</Button>
  </div>
</template>

<script>
    export default {
      name: "t1",
      data () {
        return {
          data: {
            aftermarket: true,
            arrears: true,
            beauty: true,
            beautyCash: true,
            beautyPractice: true,
            dateTime: true,
            enable: true,
            hairdressing: true,
            hairdressingCash: true,
            hairdressingSnap: true,
            highEndProjects: true,
            id: 0,
            memberStorageValue: true,
            passenger: true,
            personalPerformance: true,
            preSale: true,
            product: true,
            productCash: true,
            productSnap: true,
            projectCash: true,
            projectSnap: true,
            storeId: 0,
            storeName: '',
            yoga: true,
            yogaCash: true,
            yogaSnap: true
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
