<template>
  <div>
    <Row :gutter="24" class="option">
      <Col span="3">
        <Button class="hy_btn" @click="got('m_index_set')">会员权益设置</Button>
      </Col>
      <Col span="3">
        <Button class="hy_btn" @click="got('m_index_info')">收集会员信息</Button>
      </Col>
      <Col span="3">
        <Button class="hy_btn" @click="got('c_index')">客户管理</Button>
      </Col>
      <Col span="3">
        <Button class="hy_btn" @click="wait">卡项管理</Button>
      </Col>
      <Col span="3">
        <Button class="hy_btn" @click="got('p_index')">项目管理</Button>
      </Col>
      <Col span="3">
        <Button class="hy_btn" @click="got('e_index')">岗位管理</Button>
      </Col>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 's_datile',
    created() {
      const m_id = this.$route.params.id;
    },
    methods: {
      got(path) {
        this.$router.push({name: path});
      },
      wait() {
        this.$Message.error('暂未开放，敬请期待');
      },
    },
  };
</script>

<style scoped>

</style>
