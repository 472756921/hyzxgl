<template>
  <div class="sa_index2">
    <h2 style="margin: .6rem 0;">薪资管理</h2>
    <h2 style="font-size: 16px">具体规则<Button class="hy_btn btn" size="small" @click="returnBack">返回</Button></h2>
    <Tabs value="salary1">
      <TabPane label="底薪" name="salary1"><sa1/></TabPane>
      <TabPane label="实操提成" name="salary2"><sa2/></TabPane>
      <TabPane label="业绩提成" name="salary3"><sa3 /></TabPane>
      <TabPane label="手工费" name="salary4"><sa4 /></TabPane>
      <TabPane label="奖金" name="salary5"><sa5 /></TabPane>
      <TabPane label="效绩" name="salary6"><sa6 /></TabPane>
      <TabPane label="罚金" name="salary7"><sa7 /></TabPane>
    </Tabs>
  </div>
</template>
<script>
  import sa1 from './sa1';
  import sa2 from './sa2';
  import sa3 from './sa3';
  import sa4 from './sa4';
  import sa5 from './sa5';
  import sa6 from './sa6';
  import sa7 from './sa7';

  export default {
    name: "sa_index",
    data(){
      return{
      }
    },
    methods:{
      returnBack(){
        this.$router.push({name: 'sa_index'});
      }
    },
    components: { sa1, sa2, sa3, sa4, sa5, sa6, sa7 },

  }
</script>

<style scoped>
  .btn{
    margin-left: .6rem;
  }
  .sa_index2{
    padding-left: 10px;

  }
</style>
