<template>
  <div>
    <h2 style="padding: .6rem;">报表管理</h2>
    <Tabs value="name1">
      <TabPane label="顾问月报" name="name1"><t1/></TabPane>
      <TabPane label="技师月报" name="name2"><t2/></TabPane>
    <!--  <TabPane label="美发技师月报" name="name3"><t3/></TabPane>-->
      <TabPane label="店月报" name="name4"><t4/></TabPane>
      <!--<TabPane label="店月报" name="name5"><t5/></TabPane>-->
      <!--<TabPane label="店日报" name="name6"><t6/></TabPane>-->
      <TabPane label="详细店日报" name="name7"><t7/></TabPane>
    </Tabs>
  </div>
</template>


<script>
  import t1 from './t1';
  import t2 from './t2';
  import t3 from './t3';
  import t4 from './t4';
  import t5 from './t5';
  import t6 from './t6';
  import t7 from './t7';

    export default {
      name: "t_index",
      components: { t1, t2, t3, t4, t5, t6, t7 },
    }
</script>

<style scoped>

</style>
