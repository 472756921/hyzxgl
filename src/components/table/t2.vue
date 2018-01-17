<template>
  <div>
    <Checkbox v-model="data.passenger ">客流</Checkbox>
    <Checkbox v-model="data.cashPerformance">现金业绩（不含产品）</Checkbox>
    <h3>面部实操</h3>
    <Checkbox v-model="data.facialPracticeAppoint">指定</Checkbox>
    <Checkbox v-model="data.facialPracticeNonSpecifiedt">非指定</Checkbox>
    <h3>身体实操</h3>
    <Checkbox v-model="data.physicalExerciseAppoint ">指定</Checkbox>
    <Checkbox v-model="data.physicalExerciseNonSpecifiedt ">非指定</Checkbox>
    <h3>高端项目</h3>
    <Checkbox v-model="data.projectCash">现金</Checkbox>
    <Checkbox v-model="data.projectSnap">卡扣</Checkbox>
    <h3>产品</h3>
    <Checkbox v-model="data.productCash ">现金</Checkbox>
    <Checkbox v-model="data.productSnap ">卡扣</Checkbox>
    <h3>其他</h3>
    <Checkbox v-model="data.giveHandToHand">赠送手工</Checkbox>
    <Checkbox v-model="data.introducePerformance">转介绍业绩</Checkbox>
    <br/>
    <br/>
    <Button class="hy_btn">保存</Button>
  </div>
</template>

<script>
    export default {
      name: "t2",
      data () {
        return {
          data: {
            passenger : false,
            cashPerformance: false,
            facialPracticeAppoint: false,
            facialPracticeNonSpecifiedt: false,
            physicalExerciseAppoint: false,
            physicalExerciseNonSpecifiedt: false,
            productCash: false,
            productSnap: false,
            projectCash: false,
            projectSnap: false,
            introducePerformance: false,
            giveHandToHand: false,
            storeId: '',
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
